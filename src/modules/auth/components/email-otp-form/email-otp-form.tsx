import { useEffect, useMemo, useRef } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, TextInput, View } from 'react-native';

import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Text } from '@/components/text';
import { useTheme } from '@/theme/use-theme';

import { type useEmailOtpFlow } from '../../hooks/use-email-otp-flow';
import { createStyles } from './email-otp-form.styles';

type EmailOtpFlow = ReturnType<typeof useEmailOtpFlow>;

export type EmailOtpFormProps = {
  flow: EmailOtpFlow;
  emailLabel?: string;
  emailPlaceholder?: string;
  sendLabel?: string;
  sendingLabel?: string;
  codeLabel?: string;
  verifyLabel?: string;
  verifyingLabel?: string;
  resendLabel?: string;
  resendingLabel?: string;
  changeEmailLabel?: string;
  emailHelper?: (email: string) => string;
};

export function EmailOtpForm({
  flow,
  emailLabel = 'E-mail',
  emailPlaceholder = 'tu@exemplo.com',
  sendLabel = 'Enviar código',
  sendingLabel = 'A enviar…',
  codeLabel = 'Código de acesso',
  verifyLabel = 'Entrar',
  verifyingLabel = 'A confirmar…',
  resendLabel = 'Reenviar código',
  resendingLabel = 'A reenviar…',
  changeEmailLabel = 'Usar outro e-mail',
  emailHelper,
}: EmailOtpFormProps) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const codeRef = useRef<TextInput | null>(null);
  useEffect(() => {
    if (flow.step === 'code') {
      const t = setTimeout(() => codeRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
  }, [flow.step]);

  return (
    <View style={styles.root}>
      {flow.feedback ? (
        <Text
          variant="bodySm"
          color={flow.feedback.kind === 'error' ? 'danger' : 'textMuted'}
        >
          {flow.feedback.text}
        </Text>
      ) : null}

      {flow.step === 'email' ? (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.root}
        >
          <Input
            label={emailLabel}
            autoCapitalize="none"
            autoComplete="email"
            keyboardType="email-address"
            inputMode="email"
            placeholder={emailPlaceholder}
            value={flow.email}
            onChangeText={flow.setEmail}
            onSubmitEditing={flow.submitEmail}
            returnKeyType="send"
            editable={!flow.pendingSend}
          />
          <Button
            label={flow.pendingSend ? sendingLabel : sendLabel}
            variant="primary"
            size="lg"
            isFullWidth
            isLoading={flow.pendingSend}
            isDisabled={!flow.canSubmitEmail}
            onPress={flow.submitEmail}
          />
        </KeyboardAvoidingView>
      ) : (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.root}
        >
          {emailHelper ? (
            <Text variant="bodySm" color="textMuted">
              {emailHelper(flow.email)}
            </Text>
          ) : null}

          <Input
            label={codeLabel}
            autoComplete="one-time-code"
            keyboardType="number-pad"
            inputMode="numeric"
            maxLength={6}
            placeholder="000000"
            value={flow.code}
            onChangeText={flow.setCode}
            onSubmitEditing={flow.submitCode}
            returnKeyType="go"
            editable={!flow.pendingVerify}
          />

          <Button
            label={flow.pendingVerify ? verifyingLabel : verifyLabel}
            variant="primary"
            size="lg"
            isFullWidth
            isLoading={flow.pendingVerify}
            isDisabled={!flow.canSubmitCode}
            onPress={flow.submitCode}
          />

          <View style={styles.helperRow}>
            <Pressable
              accessibilityRole="button"
              style={styles.linkBtn}
              onPress={flow.resend}
              disabled={flow.pendingSend}
            >
              <Text variant="bodySm" color="primary">
                {flow.pendingSend ? resendingLabel : resendLabel}
              </Text>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              style={styles.linkBtn}
              onPress={flow.editEmail}
            >
              <Text variant="bodySm" color="textMuted">
                {changeEmailLabel}
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      )}
    </View>
  );
}
