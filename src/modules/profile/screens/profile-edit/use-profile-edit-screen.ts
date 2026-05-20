import { manipulateAsync, SaveFormat, type Action } from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert } from 'react-native';

import { COPY } from '@/constants/copy';
import { ROUTES } from '@/constants/routes';
import { updateProfile } from '@/lib/updateProfile';
import { deleteAvatar, uploadAvatar, type AvatarFile } from '@/lib/uploadAvatar';
import { useAuth } from '@/modules/auth/context';
import { useTheme } from '@/theme/use-theme';

import { createStyles } from './profile-edit-screen.styles';

export const MAX_DISPLAY_NAME = 80;
export const MAX_BIO = 280;
const MAX_AVATAR_BYTES = 2 * 1024 * 1024;
const ACCEPTED_MIME = new Set(['image/jpeg', 'image/png', 'image/webp']);
const AVATAR_MAX_EDGE = 1024;

export type ProfileEditFeedback = { kind: 'success' | 'error' | 'info'; text: string } | null;

function deriveMimeType(uri: string | undefined, fallback?: string | null): string {
  if (fallback && ACCEPTED_MIME.has(fallback)) {
    return fallback;
  }
  if (!uri) {
    return 'image/jpeg';
  }
  const lower = uri.toLowerCase();
  if (lower.endsWith('.png')) {
    return 'image/png';
  }
  if (lower.endsWith('.webp')) {
    return 'image/webp';
  }
  return 'image/jpeg';
}

function deriveFileName(uri: string, mime: string): string {
  const last = uri.split('/').pop() || `avatar-${Date.now()}`;
  if (/\.(jpe?g|png|webp)$/i.test(last)) {
    return last;
  }
  const ext = mime === 'image/png' ? 'png' : mime === 'image/webp' ? 'webp' : 'jpg';
  return `${last}.${ext}`;
}

async function prepareSquareAvatarJpeg(uri: string, width: number, height: number) {
  if (width <= 0 || height <= 0) {
    return null;
  }
  const side = Math.min(width, height);
  const originX = Math.max(0, Math.floor((width - side) / 2));
  const originY = Math.max(0, Math.floor((height - side) / 2));
  const actions: Action[] = [
    { crop: { originX, originY, width: side, height: side } },
  ];
  if (side > AVATAR_MAX_EDGE) {
    actions.push({ resize: { width: AVATAR_MAX_EDGE } });
  }
  return manipulateAsync(uri, actions, { compress: 0.85, format: SaveFormat.JPEG });
}

export function useProfileEditScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const { currentUser, isAuthenticated, authResolved, applySessionUser } = useAuth();
  const copy = COPY.screens.profileEdit;

  const styles = useMemo(() => createStyles(theme), [theme]);

  const [displayName, setDisplayName] = useState(currentUser.displayName ?? '');
  const [bio, setBio] = useState(currentUser.bio ?? '');
  const [saving, setSaving] = useState(false);
  const [pendingAvatar, setPendingAvatar] = useState<'upload' | 'delete' | null>(null);
  const [feedback, setFeedback] = useState<ProfileEditFeedback>(null);

  useEffect(() => {
    if (!authResolved) {
      return;
    }
    if (!isAuthenticated) {
      router.replace(ROUTES.auth);
      return;
    }
    setDisplayName(currentUser.displayName ?? '');
    setBio(currentUser.bio ?? '');
  }, [authResolved, isAuthenticated, currentUser.displayName, currentUser.bio, router]);

  const dirty = useMemo(() => {
    const nameChanged = displayName.trim() !== (currentUser.displayName ?? '');
    const bioChanged = (bio.trim() || '') !== (currentUser.bio ?? '');
    return nameChanged || bioChanged;
  }, [currentUser.displayName, currentUser.bio, displayName, bio]);

  const handleClose = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
      return;
    }
    router.replace(ROUTES.tabs.profile);
  }, [router]);

  const handleSubmit = useCallback(async () => {
    if (saving) {
      return;
    }
    const name = displayName.trim().replace(/\s+/g, ' ');
    if (name.length === 0 || name.length > MAX_DISPLAY_NAME) {
      setFeedback({
        kind: 'error',
        text: `Nome deve ter entre 1 e ${MAX_DISPLAY_NAME} caracteres.`,
      });
      return;
    }
    const bioTrimmed = bio.trim();
    if (bioTrimmed.length > MAX_BIO) {
      setFeedback({ kind: 'error', text: `Bio com máx ${MAX_BIO} caracteres.` });
      return;
    }
    setSaving(true);
    setFeedback(null);
    const res = await updateProfile({
      displayName: name,
      bio: bioTrimmed.length > 0 ? bioTrimmed : null,
    });
    setSaving(false);
    if (!res.ok) {
      setFeedback({ kind: 'error', text: res.error });
      return;
    }
    applySessionUser(res.user);
    setFeedback({ kind: 'success', text: copy.successMessage });
  }, [applySessionUser, bio, copy.successMessage, displayName, saving]);

  const handlePickAvatar = useCallback(async () => {
    if (pendingAvatar) {
      return;
    }
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(copy.permissionDenied);
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: false,
      quality: 0.85,
      exif: false,
    });
    if (result.canceled) {
      return;
    }
    const asset = result.assets[0];
    if (!asset) {
      return;
    }
    if (typeof asset.fileSize === 'number' && asset.fileSize > MAX_AVATAR_BYTES) {
      setFeedback({ kind: 'error', text: copy.tooLargeMessage });
      return;
    }

    let uploadUri = asset.uri;
    let mime = deriveMimeType(asset.uri, asset.mimeType ?? null);
    try {
      const manipulated = await prepareSquareAvatarJpeg(asset.uri, asset.width, asset.height);
      if (manipulated) {
        uploadUri = manipulated.uri;
        mime = 'image/jpeg';
      }
    } catch {
      /* keep original uri / mime */
    }

    if (!ACCEPTED_MIME.has(mime)) {
      setFeedback({ kind: 'error', text: copy.invalidTypeMessage });
      return;
    }

    const file: AvatarFile = {
      uri: uploadUri,
      name: deriveFileName(uploadUri, mime),
      type: mime,
    };

    setPendingAvatar('upload');
    setFeedback(null);
    const res = await uploadAvatar(file);
    setPendingAvatar(null);
    if (!res.ok) {
      setFeedback({ kind: 'error', text: res.error });
      return;
    }
    applySessionUser(res.user);
    setFeedback({ kind: 'success', text: copy.avatarUpdatedMessage });
  }, [
    applySessionUser,
    copy.avatarUpdatedMessage,
    copy.invalidTypeMessage,
    copy.permissionDenied,
    copy.tooLargeMessage,
    pendingAvatar,
  ]);

  const handleRemoveAvatar = useCallback(async () => {
    if (pendingAvatar || !currentUser.avatarUrl) {
      return;
    }
    setPendingAvatar('delete');
    setFeedback(null);
    const res = await deleteAvatar();
    setPendingAvatar(null);
    if (!res.ok) {
      setFeedback({ kind: 'error', text: res.error });
      return;
    }
    applySessionUser(res.user);
    setFeedback({ kind: 'info', text: copy.avatarRemovedMessage });
  }, [applySessionUser, copy.avatarRemovedMessage, currentUser.avatarUrl, pendingAvatar]);

  return {
    styles,
    copy,
    authResolved,
    isAuthenticated,
    currentUser,
    displayName,
    bio,
    feedback,
    saving,
    pendingAvatar,
    dirty,
    setDisplayName,
    setBio,
    handleSubmit,
    handlePickAvatar,
    handleRemoveAvatar,
    handleClose,
    MAX_BIO,
    MAX_DISPLAY_NAME,
  };
}
