import { useRouter } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';

import { COPY } from '@/constants/copy';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/modules/auth/context';
import { useRequireAuth } from '@/modules/auth/gate';
import { useCategoriesCatalog, useLibrary } from '@/state/library';
import { useTheme } from '@/theme/use-theme';
import type { Category } from '@/types';

import type { DraftItem } from '../../components/items-editor';
import { createStyles } from './create-screen.styles';

const generateLocalId = () =>
  `draft-item-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const buildEmptyItem = (): DraftItem => ({
  tempId: generateLocalId(),
  title: '',
  description: '',
});

export function useCreateScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const { isGuest, getLatestUser } = useAuth();
  const requireAuth = useRequireAuth();
  const { createChecklist } = useLibrary();
  const categories = useCategoriesCatalog();
  const copy = COPY.screens.create;
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [items, setItems] = useState<DraftItem[]>(() => [buildEmptyItem()]);
  const [errors, setErrors] = useState<Record<string, string | null>>({});

  const handleTitleChange = useCallback((next: string) => {
    setTitle(next);
    setErrors((current) => ({ ...current, title: null }));
  }, []);

  const handleDescriptionChange = useCallback((next: string) => {
    setDescription(next);
  }, []);

  const handleCategorySelect = useCallback((category: Category) => {
    setSelectedCategoryId((current) => (current === category.id ? null : category.id));
    setErrors((current) => ({ ...current, category: null }));
  }, []);

  const handleAddTag = useCallback((tag: string) => {
    setTags((current) => (current.includes(tag) ? current : [...current, tag]));
  }, []);

  const handleRemoveTag = useCallback((tag: string) => {
    setTags((current) => current.filter((existing) => existing !== tag));
  }, []);

  const handleAddItem = useCallback(() => {
    setItems((current) => [...current, buildEmptyItem()]);
    setErrors((current) => ({ ...current, items: null }));
  }, []);

  const handleRemoveItem = useCallback((tempId: string) => {
    setItems((current) => current.filter((item) => item.tempId !== tempId));
  }, []);

  const handleChangeItemTitle = useCallback((tempId: string, value: string) => {
    setItems((current) =>
      current.map((item) => (item.tempId === tempId ? { ...item, title: value } : item)),
    );
    setErrors((current) => ({ ...current, items: null }));
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

    const newId = createChecklist(
      {
        title: title.trim(),
        description: description.trim() || undefined,
        categoryId: selectedCategoryId,
        tags,
        visibility: 'public',
        items: validItems.map((item) => ({
          title: item.title.trim(),
          description: item.description.trim() || undefined,
        })),
      },
      getLatestUser().id,
    );

    router.replace(ROUTES.checklistDetails(newId));
  }, [
    copy.validation,
    createChecklist,
    description,
    getLatestUser,
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

  return {
    styles,
    title,
    description,
    selectedCategoryId,
    tags,
    items,
    categories,
    errors,
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
