export type Comment = {
  id: string;
  checklistId?: string;
  itemId?: string;
  authorId: string;
  content: string;
  createdAt: string;
};

export type CommentWithAuthor = Comment & {
  authorName: string;
  authorInitials?: string;
  relativeCreatedAt: string;
};
