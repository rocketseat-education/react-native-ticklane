import { Image } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COPY } from '@/constants/copy';

import { brandLoadingColors, createStyles } from './brand-loading.styles';
import { useBrandLoading } from './use-brand-loading';

export type BrandLoadingProps = {
  /** Fundo por defeito preto para contrastar com o logo; podes usar noutros contextos (ex.: fallback). */
  backgroundColor?: string;
};

export function BrandLoading({ backgroundColor = brandLoadingColors.background }: BrandLoadingProps) {
  const styles = createStyles(backgroundColor);
  const { logoSource, logoAnimatedStyle, dot1Style, dot2Style, dot3Style } = useBrandLoading();

  return (
    <SafeAreaView
      style={styles.root}
      edges={['top', 'right', 'bottom', 'left']}
      accessibilityRole="progressbar"
      accessibilityLabel={COPY.brand.loadingAccessibilityLabel}
    >
      <StatusBar style="light" />
      <Animated.View style={[styles.logoWrap, logoAnimatedStyle]}>
        <Image
          source={logoSource}
          style={{ width: 260, height: 88 }}
          contentFit="contain"
          accessibilityIgnoresInvertColors
        />
      </Animated.View>
      <View style={styles.dotsRow} importantForAccessibility="no-hide-descendants">
        <Animated.View style={[styles.dot, { backgroundColor: brandLoadingColors.dot }, dot1Style]} />
        <Animated.View style={[styles.dot, { backgroundColor: brandLoadingColors.dot }, dot2Style]} />
        <Animated.View style={[styles.dot, { backgroundColor: brandLoadingColors.dot }, dot3Style]} />
      </View>
    </SafeAreaView>
  );
}
