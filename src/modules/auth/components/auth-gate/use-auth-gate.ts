import { useCallback, useEffect, useMemo } from 'react';

import { COPY } from '@/constants/copy';
import { useTheme } from '@/theme/use-theme';

import { useAuthGateState } from '../../gate/use-auth-gate-state';
import { useEmailOtpFlow } from '../../hooks/use-email-otp-flow';
import { createStyles } from './auth-gate.styles';

export function useAuthGate() {
  const { theme } = useTheme();
  const { isVisible, intent, resolve, hide } = useAuthGateState();

  const styles = useMemo(() => createStyles(theme), [theme]);

  const intentDescription = intent
    ? COPY.auth.gate.intents[intent]
    : COPY.auth.gate.intents.fallback;

  const description = `${COPY.auth.gate.descriptionPrefix} ${intentDescription}.`;

  const flow = useEmailOtpFlow({
    onAuthenticated: () => {
      resolve(true);
    },
  });

  // Sempre que o sheet abre / fecha, reset do estado para evitar arrastar
  // dados de uma sessão antiga (ex.: código já gasto, e-mail anterior).
  useEffect(() => {
    if (!isVisible) {
      flow.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  const isBusy = flow.pendingSend || flow.pendingVerify;

  const handleCancel = useCallback(() => {
    if (isBusy) {
      return;
    }
    hide();
  }, [hide, isBusy]);

  return {
    styles,
    isVisible,
    title: COPY.auth.gate.title,
    description,
    cancelLabel: COPY.auth.gate.cancel,
    iconColor: theme.colors.primary,
    iconSize: theme.sizes.iconLg,
    isBusy,
    flow,
    handleCancel,
  };
}
