export type ChecklistExecution = {
  id: string;
  checklistId: string;
  startedAt: string;
  updatedAt: string;
};

export type ChecklistExecutionItem = {
  id: string;
  executionId: string;
  itemId: string;
  checked: boolean;
  checkedAt?: string;
};
