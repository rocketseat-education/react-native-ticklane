import { useCallback, useMemo, useRef, useState } from 'react';
import { Alert, Keyboard, type TextInput } from 'react-native';

import { COPY } from '@/constants/copy';
import { useAuth } from '@/modules/auth/context';
import { useRequireAuth } from '@/modules/auth/gate';
import { useLibrary, type CommentTarget } from '@/state/library';
import { useTheme } from '@/theme/use-theme';

import { createStyles } from './comment-composer.styles';

const MODAL_TRANSITION_MS = 350;

const wait = (ms: number) =>
  new Promise<void>((resolveWait) => {
    setTimeout(resolveWait, ms);
  });

type UseCommentComposerParams = {
  target: CommentTarget;
};

export function useCommentComposer({ target }: UseCommentComposerParams) {
  const { theme } = useTheme();
  const { currentUser, isGuest, getLatestUser } = useAuth();
  const { addComment } = useLibrary();
  const requireAuth = useRequireAuth();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const draftRef = useRef('');
  const submittingRef = useRef(false);
  const inputRef = useRef<TextInput>(null);
  const copy = COPY.screens.checklistDetails;

  const styles = useMemo(() => createStyles(theme), [theme]);

  const trimmed = text.trim();
  const canSubmit = trimmed.length > 0 && !isSubmitting;

  const handleChangeText = useCallback((next: string) => {
    draftRef.current = next;
    setText(next);
  }, []);

  const handleClose = useCallback(() => {
    Keyboard.dismiss();
    draftRef.current = '';
    setIsModalVisible(false);
    setText('');
  }, []);

  const handleModalShown = useCallback(() => {
    // const timeout = setTimeout(() => {
    //   inputRef.current?.focus();
    // }, 100);
  
    // return () => clearTimeout(timeout);
  }, []);

  const handleOpen = useCallback(async () => {
    const wasGuest = isGuest;
    const ok = await requireAuth('comment');

    if (!ok) {
      return;
    }

    if (wasGuest) {
      await wait(MODAL_TRANSITION_MS);
    }

    setIsModalVisible(true);
  }, [isGuest, requireAuth]);

  const handleSubmit = useCallback(async () => {
    const body = draftRef.current.trim();

    if (!body || submittingRef.current) {
      return;
    }

    submittingRef.current = true;
    setIsSubmitting(true);

    try {
      const result = await addComment(target, body, getLatestUser().id);

      if (!result.ok) {
        Alert.alert('Não foi possível comentar', result.error);
        return;
      }
      handleClose();
    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  }, [addComment, getLatestUser, handleClose, target]);

  return {
    styles,
    placeholder: copy.commentPlaceholder,
    placeholderColor: theme.colors.textSubtle,
    text,
    canSubmit,
    submitIconColor: canSubmit ? theme.colors.primary : theme.colors.textSubtle,
    cancelIconColor: theme.colors.textMuted,
    iconSize: theme.sizes.iconMd,
    avatarInitials: currentUser.initials,
    avatarName: currentUser.displayName,
    triggerAccessibilityLabel: copy.commentPlaceholder,
    submitAccessibilityLabel: copy.commentModalSubmit,
    cancelAccessibilityLabel: copy.commentSubmit,
    modalTitle: copy.commentModalTitle,
    isModalVisible,
    inputRef,
    headerHitSlop: theme.sizes.hitSlop,
    handleOpen,
    handleClose,
    handleModalShown,
    handleChangeText,
    handleSubmit,
    isSubmitting,
  };
}
