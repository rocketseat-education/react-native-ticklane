export type Category = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  checklistsCount: number;
};

export type CategoryWithSelection = Category & {
  isSelected: boolean;
};
