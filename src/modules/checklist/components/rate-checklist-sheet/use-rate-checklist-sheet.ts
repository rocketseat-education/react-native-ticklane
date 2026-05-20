import { useCallback, useEffect, useMemo, useState } from 'react';

import { COPY } from '@/constants/copy';
import { useAuth } from '@/modules/auth/context';
import { useLibrary, useUserRating } from '@/state/library';
import { useTheme } from '@/theme/use-theme';

import { createStyles } from './rate-checklist-sheet.styles';

type UseRateChecklistSheetParams = {
  checklistId: string;
  checklistTitle: string;
  visible: boolean;
  onClose: () => void;
};

export function useRateChecklistSheet({
  checklistId,
  checklistTitle,
  visible,
  onClose,
}: UseRateChecklistSheetParams) {
  const { theme } = useTheme();
  const { currentUser, isGuest } = useAuth();
  const { rateChecklist } = useLibrary();
  const persistedScore = useUserRating(checklistId, isGuest ? null : currentUser.id);
  const [selectedScore, setSelectedScore] = useState(persistedScore);
  const copy = COPY.screens.checklistDetails.rateSheet;

  useEffect(() => {
    if (visible) {
      setSelectedScore(persistedScore);
    }
  }, [persistedScore, visible]);

  const styles = useMemo(() => createStyles(theme), [theme]);

  const handleScoreChange = useCallback((next: number) => {
    setSelectedScore(next);
  }, []);

  const handleSave = useCallback(() => {
    if (selectedScore <= 0 || isGuest) {
      return;
    }

    rateChecklist(checklistId, selectedScore, currentUser.id);
    onClose();
  }, [checklistId, currentUser.id, isGuest, onClose, rateChecklist, selectedScore]);

  const handleUnrate = useCallback(() => {
    if (isGuest) {
      return;
    }

    rateChecklist(checklistId, 0, currentUser.id);
    onClose();
  }, [checklistId, currentUser.id, isGuest, onClose, rateChecklist]);

  const description = `${copy.descriptionPrefix} "${checklistTitle}".`;
  const helperLabel = selectedScore > 0 ? `${copy.currentScore} ${selectedScore}/5` : copy.unrated;

  return {
    styles,
    title: copy.title,
    description,
    helperLabel,
    selectedScore,
    canSave: selectedScore > 0 && selectedScore !== persistedScore,
    saveLabel: copy.save,
    unrateLabel: copy.unrate,
    starsLabel: copy.title,
    handleScoreChange,
    handleSave,
    handleUnrate,
  };
}
