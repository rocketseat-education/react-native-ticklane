import { type ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { BrandLoading } from '@/components/brand-loading';
import { createChecklistRequest, updateChecklistRequest } from '@/lib/checklistWriteApi';
import { createCommentRequest } from '@/lib/commentApi';
import { addFavoriteRequest, removeFavoriteRequest } from '@/lib/favoriteApi';
import { fetchLibraryFromApi } from '@/lib/fetchLibraryFromApi';
import { setRatingRequest } from '@/lib/ratingApi';
import { useAuth } from '@/modules/auth/context';

import { applyChecklistWriteResponse } from './apply-checklist-write';
import { computeChecklistAverageRating } from './compute-checklist-average-rating';
import { LibraryContext } from './library-context';
import type {
  ChecklistFormInput,
  LibraryActions,
  LibraryContextValue,
  LibraryState,
  UpdateChecklistInput,
} from './library-types';

const generateId = (prefix: string) =>
  `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const emptyLibrary: LibraryState = {
  checklists: [],
  checklistItems: [],
  checklistLinks: [],
  comments: [],
  favorites: [],
  ratings: [],
  categories: [],
  users: [],
};

type LibraryProviderProps = {
  children: ReactNode;
};

export function LibraryProvider({ children }: LibraryProviderProps) {
  const [loadStatus, setLoadStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [loadError, setLoadError] = useState<string | null>(null);
  const [state, setState] = useState<LibraryState>(emptyLibrary);

  const { currentUser, authResolved } = useAuth();
  const sessionUserId = currentUser.isGuest ? null : currentUser.id;
  const previousSessionUserIdRef = useRef<string | null | undefined>(undefined);

  // Carregamento inicial + recarregar sempre que a sessão muda
  // (login/logout): os contadores de favoritos / ratings podem ter mudado
  // no servidor desde o último fetch.
  useEffect(() => {
    if (!authResolved) {
      return;
    }
    const previous = previousSessionUserIdRef.current;
    previousSessionUserIdRef.current = sessionUserId;
    if (previous === sessionUserId && loadStatus === 'ready') {
      return;
    }

    const controller = new AbortController();
    if (loadStatus !== 'ready') {
      setLoadStatus('loading');
    }
    fetchLibraryFromApi(controller.signal)
      .then((data) => {
        setState(data);
        setLoadStatus('ready');
      })
      .catch((err: unknown) => {
        if (
          err &&
          typeof err === 'object' &&
          'name' in err &&
          (err as { name: string }).name === 'AbortError'
        ) {
          return;
        }
        setLoadError(err instanceof Error ? err.message : 'Erro desconhecido');
        setLoadStatus('error');
      });
    return () => controller.abort();
    // `loadStatus` é deliberadamente ignorado nas deps para evitar loops.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authResolved, sessionUserId]);

  const reload = useCallback(async () => {
    try {
      const data = await fetchLibraryFromApi();
      setState(data);
      setLoadStatus('ready');
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : 'Erro desconhecido');
    }
  }, []);

  const isFavorite = useCallback<LibraryActions['isFavorite']>(
    (checklistId, userId) =>
      userId
        ? state.favorites.some(
            (favorite) =>
              favorite.userId === userId && favorite.checklistId === checklistId,
          )
        : false,
    [state.favorites],
  );

  const applyFavoriteChange = useCallback(
    (checklistId: string, userId: string, becomeFavorite: boolean) => {
      setState((current) => {
        const exists = current.favorites.some(
          (favorite) => favorite.userId === userId && favorite.checklistId === checklistId,
        );
        if (exists === becomeFavorite) {
          return current;
        }

        const nextFavorites = becomeFavorite
          ? [
              ...current.favorites,
              { userId, checklistId, createdAt: new Date().toISOString() },
            ]
          : current.favorites.filter(
              (favorite) =>
                !(favorite.userId === userId && favorite.checklistId === checklistId),
            );

        const nextChecklists = current.checklists.map((checklist) => {
          if (checklist.id !== checklistId) {
            return checklist;
          }
          return {
            ...checklist,
            favoritesCount: Math.max(
              0,
              checklist.favoritesCount + (becomeFavorite ? 1 : -1),
            ),
          };
        });

        return {
          ...current,
          favorites: nextFavorites,
          checklists: nextChecklists,
        };
      });
    },
    [],
  );

  const toggleFavorite = useCallback<LibraryActions['toggleFavorite']>(
    (checklistId, userId) => {
      const wasFavorite = state.favorites.some(
        (favorite) => favorite.userId === userId && favorite.checklistId === checklistId,
      );
      const nextIsFavorite = !wasFavorite;

      // Optimistic update — UX imediata.
      applyFavoriteChange(checklistId, userId, nextIsFavorite);

      // Sincroniza com o backend; em falha, revertemos o estado local.
      (async () => {
        const result = nextIsFavorite
          ? await addFavoriteRequest(checklistId)
          : await removeFavoriteRequest(checklistId);
        if (!result.ok) {
          applyFavoriteChange(checklistId, userId, wasFavorite);
        }
      })();

      return nextIsFavorite;
    },
    [applyFavoriteChange, state.favorites],
  );

  const addComment = useCallback<LibraryActions['addComment']>(async (target, content, _authorId) => {
    const itemId = target.type === 'item' ? target.itemId : undefined;
    const result = await createCommentRequest(target.checklistId, content, itemId);

    if (!result.ok) {
      return result;
    }

    const { comment } = result;

    setState((current) => {
      if (current.comments.some((existing) => existing.id === comment.id)) {
        return current;
      }

      return {
        ...current,
        comments: [...current.comments, comment],
        checklists: current.checklists.map((checklist) =>
          checklist.id === target.checklistId
            ? { ...checklist, commentsCount: checklist.commentsCount + 1 }
            : checklist,
        ),
      };
    });

    return { ok: true, id: comment.id };
  }, []);

  const applyRatingChange = useCallback(
    (checklistId: string, userId: string, score: number, serverAverage?: number) => {
      setState((current) => {
        const existingIndex = current.ratings.findIndex(
          (record) => record.checklistId === checklistId && record.userId === userId,
        );
        const createdAt = new Date().toISOString();

        let nextRatings = [...current.ratings];

        if (score <= 0) {
          nextRatings = nextRatings.filter(
            (record) => !(record.checklistId === checklistId && record.userId === userId),
          );
        } else if (existingIndex >= 0) {
          nextRatings[existingIndex] = {
            ...nextRatings[existingIndex],
            score,
            createdAt,
          };
        } else {
          nextRatings.push({
            id: generateId('rating'),
            checklistId,
            userId,
            score,
            createdAt,
          });
        }

        const averageRating =
          serverAverage ?? computeChecklistAverageRating(nextRatings, checklistId);

        const nextChecklists = current.checklists.map((checklist) =>
          checklist.id === checklistId ? { ...checklist, averageRating } : checklist,
        );

        return {
          ...current,
          ratings: nextRatings,
          checklists: nextChecklists,
        };
      });
    },
    [],
  );

  const rateChecklist = useCallback<LibraryActions['rateChecklist']>(
    (checklistId, score, userId) => {
      const existing = state.ratings.find(
        (record) => record.checklistId === checklistId && record.userId === userId,
      );
      const previousScore = existing?.score ?? 0;

      applyRatingChange(checklistId, userId, score);

      (async () => {
        const result = await setRatingRequest(checklistId, score);
        if (!result.ok) {
          applyRatingChange(checklistId, userId, previousScore);
          return;
        }
        if (result.averageRating !== undefined) {
          applyRatingChange(checklistId, userId, score, result.averageRating);
        }
      })();
    },
    [applyRatingChange, state.ratings],
  );

  const createChecklist = useCallback<LibraryActions['createChecklist']>(async (input) => {
    const result = await createChecklistRequest({
      title: input.title,
      description: input.description,
      categoryId: input.categoryId,
      tags: input.tags,
      visibility: input.visibility ?? 'public',
      items: input.items.map((item) => ({
        title: item.title,
        description: item.description,
      })),
      links: input.links,
    });

    if (!result.ok) {
      return result;
    }

    setState((current) => applyChecklistWriteResponse(current, result.data));
    return { ok: true, checklistId: result.data.checklist.id };
  }, []);

  const updateChecklist = useCallback<LibraryActions['updateChecklist']>(
    async (checklistId, input: UpdateChecklistInput) => {
      const result = await updateChecklistRequest(checklistId, {
        title: input.title,
        description: input.description,
        categoryId: input.categoryId,
        tags: input.tags,
        visibility: input.visibility,
        items: input.items.map((item) => ({
          ...(item.id ? { id: item.id } : {}),
          title: item.title,
          description: item.description,
        })),
        links: input.links,
      });

      if (!result.ok) {
        return result;
      }

      setState((current) => applyChecklistWriteResponse(current, result.data));
      return { ok: true, checklistId: result.data.checklist.id };
    },
    [],
  );

  const value = useMemo<LibraryContextValue>(
    () => ({
      ...state,
      createChecklist,
      updateChecklist,
      toggleFavorite,
      isFavorite,
      addComment,
      rateChecklist,
      reload,
    }),
    [
      state,
      createChecklist,
      updateChecklist,
      toggleFavorite,
      isFavorite,
      addComment,
      rateChecklist,
      reload,
    ],
  );

  if (loadStatus === 'loading') {
    return <BrandLoading />;
  }

  if (loadStatus === 'error') {
    return (
      <View style={styles.centered}>
        <Text style={styles.title}>Servidor indisponível</Text>
        <Text style={styles.hint}>{loadError}</Text>
      </View>
    );
  }

  return <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>;
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  hint: {
    fontSize: 15,
    textAlign: 'center',
    opacity: 0.8,
  },
});
