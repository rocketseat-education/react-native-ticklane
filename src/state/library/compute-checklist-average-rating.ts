import type { ChecklistRating } from '@/types';

/** Média das notas válidas (1–5) para uma checklist no estado local. */
export function computeChecklistAverageRating(
  ratings: ChecklistRating[],
  checklistId: string,
): number {
  const scores = ratings
    .filter((record) => record.checklistId === checklistId && record.score > 0)
    .map((record) => record.score);

  if (scores.length === 0) {
    return 0;
  }

  const sum = scores.reduce((total, score) => total + score, 0);
  return sum / scores.length;
}
