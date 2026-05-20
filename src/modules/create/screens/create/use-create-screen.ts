import { useRouter } from 'expo-router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { COPY } from '@/constants/copy';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/modules/auth/context';
import { useRequireAuth } from '@/modules/auth/gate';
import { useCategoriesCatalog, useChecklist, useLibrary } from '@/state/library';
import { useTheme } from '@/theme/use-theme';
import type { Category } from '@/types';

import type { DraftItem } from '../../components/items-editor';
import { createStyles } from './create-screen.styles';

export type UseCreateScreenParams = {
  checklistId?: string;
};

const generateLocalId = () =>
  `draft-item-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const buildEmptyItem = (): DraftItem => ({
  tempId: generateLocalId(),
  title: '',
  description: '',
});

export function useCreateScreen({ checklistId }: UseCreateScreenParams = {}) {
  const router = useRouter();
  const { theme } = useTheme();
  const { isGuest, currentUser } = useAuth();
  const requireAuth = useRequireAuth();
  const { createChecklist, updateChecklist } = useLibrary();
  const categories = useCategoriesCatalog();
  const isEditMode = Boolean(checklistId);
  const viewerId = isGuest ? null : currentUser.id;
  const existingChecklist = useChecklist(checklistId ?? '', viewerId);
  const copy = isEditMode ? COPY.screens.editChecklist : COPY.screens.create;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const initializedRef = useRef(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [items, setItems] = useState<DraftItem[]>(() => [buildEmptyItem()]);
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isEditMode || !existingChecklist || initializedRef.current) {
      return;
    }

    if (viewerId && existingChecklist.authorId !== viewerId) {
      router.back();
      return;
    }

    initializedRef.current = true;
    setTitle(existingChecklist.title);
    setDescription(existingChecklist.description ?? '');
    setSelectedCategoryId(existingChecklist.categoryId);
    setTags(existingChecklist.tags);
    setItems(
      existingChecklist.items.length
        ? existingChecklist.items.map((item) => ({
            tempId: generateLocalId(),
            id: item.id,
            title: item.title,
            description: item.description ?? '',
          }))
        : [buildEmptyItem()],
    );
  }, [isEditMode, existingChecklist, router, viewerId]);

  const handleTitleChange = useCallback((next: string) => {
    setTitle(next);
    setErrors((current) => ({ ...current, title: null, submit: null }));
  }, []);

  const handleDescriptionChange = useCallback((next: string) => {
    setDescription(next);
  }, []);

  const handleCategorySelect = useCallback((category: Category) => {
    setSelectedCategoryId((current) => (current === category.id ? null : category.id));
    setErrors((current) => ({ ...current, category: null, submit: null }));
  }, []);

  const handleAddTag = useCallback((tag: string) => {
    setTags((current) => (current.includes(tag) ? current : [...current, tag]));
  }, []);

  const handleRemoveTag = useCallback((tag: string) => {
    setTags((current) => current.filter((existing) => existing !== tag));
  }, []);

  const handleAddItem = useCallback(() => {
    setItems((current) => [...current, buildEmptyItem()]);
    setErrors((current) => ({ ...current, items: null, submit: null }));
  }, []);

  const handleRemoveItem = useCallback((tempId: string) => {
    setItems((current) => current.filter((item) => item.tempId !== tempId));
  }, []);

  const handleChangeItemTitle = useCallback((tempId: string, value: string) => {
    setItems((current) =>
      current.map((item) => (item.tempId === tempId ? { ...item, title: value } : item)),
    );
    setErrors((current) => ({ ...current, items: null, submit: null }));
  }, []);

  const handleChangeItemDescription = useCallback((tempId: string, value: string) => {
    setItems((current) =>
      current.map((item) => (item.tempId === tempId ? { ...item, description: value } : item)),
    );
  }, []);

  const handleClose = useCallback(() => {
    router.back();
  }, [router]);

  const handleSubmit = useCallback(async () => {
    const nextErrors: Record<string, string | null> = {};

    if (!title.trim()) {
      nextErrors.title = copy.validation.titleRequired;
    }

    if (!selectedCategoryId) {
      nextErrors.category = copy.validation.categoryRequired;
    }

    const validItems = items.filter((item) => item.title.trim().length > 0);

    if (!validItems.length) {
      nextErrors.items = copy.validation.itemsRequired;
    } else if (validItems.length !== items.length) {
      nextErrors.items = copy.validation.itemTitleRequired;
    }

    if (Object.values(nextErrors).some(Boolean)) {
      setErrors(nextErrors);
      return;
    }

    const ok = await requireAuth('create');

    if (!ok || !selectedCategoryId) {
      return;
    }

    if (isEditMode && !checklistId) {
      return;
    }

    if (isEditMode && !existingChecklist) {
      nextErrors.submit = copy.validation.notFound;
      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors((current) => ({ ...current, submit: null }));

    const formItems = validItems.map((item) => ({
      ...(item.id ? { id: item.id } : {}),
      title: item.title.trim(),
      description: item.description.trim() || undefined,
    }));

    const result = isEditMode
      ? await updateChecklist(checklistId!, {
          title: title.trim(),
          description: description.trim() || undefined,
          categoryId: selectedCategoryId,
          tags,
          visibility: existingChecklist!.visibility,
          items: formItems,
          links: existingChecklist!.links.map((link) => ({
            label: link.label,
            url: link.url,
          })),
        })
      : await createChecklist({
          title: title.trim(),
          description: description.trim() || undefined,
          categoryId: selectedCategoryId,
          tags,
          visibility: 'public',
          items: formItems,
        });

    setIsSubmitting(false);

    if (!result.ok) {
      setErrors((current) => ({ ...current, submit: result.error }));
      return;
    }

    router.replace(ROUTES.checklistDetails(result.checklistId));
  }, [
    copy.validation,
    createChecklist,
    updateChecklist,
    description,
    checklistId,
    existingChecklist,
    isEditMode,
    items,
    requireAuth,
    router,
    selectedCategoryId,
    tags,
    title,
  ]);

  const guardedRequireAuthMessage = useMemo(
    () => (isGuest ? copy.subtitle : copy.subtitle),
    [copy.subtitle, isGuest],
  );

  const isFormReady = !isEditMode || Boolean(existingChecklist);

  return {
    styles,
    title,
    description,
    selectedCategoryId,
    tags,
    items,
    categories,
    errors,
    isSubmitting,
    isFormReady,
    screenTitle: copy.title,
    screenSubtitle: guardedRequireAuthMessage,
    sectionsCopy: copy.sections,
    fieldsCopy: copy.fields,
    submitLabel: copy.cta,
    handleTitleChange,
    handleDescriptionChange,
    handleCategorySelect,
    handleAddTag,
    handleRemoveTag,
    handleAddItem,
    handleRemoveItem,
    handleChangeItemTitle,
    handleChangeItemDescription,
    handleClose,
    handleSubmit,
  };
}
