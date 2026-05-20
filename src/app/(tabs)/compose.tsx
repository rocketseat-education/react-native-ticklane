import { View } from 'react-native';

import { useTheme } from '@/theme/use-theme';

/**
 * Rota técnica da tab «Criar»: o fluxo abre no `tabPress` do layout (modal `/create`).
 * Mantém fundo coerente se a navegação cair aqui (ex.: deep link).
 */
export default function ComposeTabRoute() {
  const { theme } = useTheme();

  return <View style={{ flex: 1, backgroundColor: theme.colors.bg }} />;
}
