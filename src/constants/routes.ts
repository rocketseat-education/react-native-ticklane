export const ROUTES = {
  tabs: {
    home: '/',
    search: '/search',
    /** Tab hub “Criar” antes de abrir o modal de formulário */
    compose: '/compose',
    favorites: '/favorites',
    profile: '/profile',
  },
  checklistDetails: (id: string) => `/checklist/${id}` as const,
  itemDetails: (checklistId: string, itemId: string) =>
    `/checklist/${checklistId}/item/${itemId}` as const,
  execution: (id: string) => `/execution/${id}` as const,
  runningExecutionsList: '/executions/running' as const,
  profileMyChecklistsList: '/profile/my-checklists' as const,
  profileMyFavoritesList: '/profile/my-favorites' as const,
  author: (id: string) => `/author/${id}` as const,
  create: '/create',
  auth: '/auth',
  profileEdit: '/profile/edit',
} as const;

export type AppRoute =
  | (typeof ROUTES.tabs)[keyof typeof ROUTES.tabs]
  | ReturnType<typeof ROUTES.checklistDetails>
  | ReturnType<typeof ROUTES.itemDetails>
  | ReturnType<typeof ROUTES.execution>
  | typeof ROUTES.runningExecutionsList
  | typeof ROUTES.profileMyChecklistsList
  | typeof ROUTES.profileMyFavoritesList
  | ReturnType<typeof ROUTES.author>
  | typeof ROUTES.create
  | typeof ROUTES.auth
  | typeof ROUTES.profileEdit;
