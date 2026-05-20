import { useRouter } from 'expo-router';
import { useCallback, useMemo } from 'react';

import { COPY } from '@/constants/copy';
import { useTheme } from '@/theme/use-theme';

import { useEmailOtpFlow } from '../../hooks/use-email-otp-flow';
import { createStyles } from './auth-screen.styles';

export function useAuthScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const screenCopy = COPY.screens.auth;

  const styles = useMemo(() => createStyles(theme), [theme]);

  const handleClose = useCallback(() => {
    router.back();
  }, [router]);

  const flow = useEmailOtpFlow({
    onAuthenticated: () => {
      router.back();
    },
  });

  return {
    styles,
    title: flow.step === 'email' ? screenCopy.title : screenCopy.codeTitle,
    subtitle: screenCopy.subtitle,
    keepBrowsingLabel: COPY.auth.keepBrowsing,
    flow,
    handleClose,
  };
}
