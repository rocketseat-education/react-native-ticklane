export const sizes = {
  hitSlop: 8,
  iconXs: 14,
  iconSm: 16,
  iconMd: 20,
  iconLg: 24,
  iconXl: 28,
  /** Tab bar: ícone de ação principal (ex.: criar checklist) */
  iconTabEmphasized: 30,
  controlSm: 36,
  controlMd: 44,
  controlLg: 52,
  avatarSm: 24,
  avatarMd: 32,
  avatarLg: 44,
  avatarXl: 88,
  cardCompact: 172,
  cardCompactHeight: 132,
  cardWide: 264,
  cardWideHeight: 196,
  /** Cards de execução offline (perfil / lista): mais baixos que o card da home */
  offlineExecutionCardHeight: 118,
  borderHairline: 0.5,
  borderThin: 1,
  borderThick: 2,
} as const;

export type SizeToken = keyof typeof sizes;
