import { Feather } from '@expo/vector-icons';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';

import { Container } from '@/components/container';
import { IconButton } from '@/components/icon-button';
import { ScreenHeader } from '@/components/screen-header';
import { Text } from '@/components/text';
import { COPY } from '@/constants/copy';

import { EmailOtpForm } from '../../components/email-otp-form';
import { useAuthScreen } from './use-auth-screen';

export function AuthScreen() {
  const { styles, title, subtitle, keepBrowsingLabel, flow, handleClose } =
    useAuthScreen();

  return (
    <Container>
      <ScreenHeader
        title={title}
        subtitle={flow.step === 'email' ? subtitle : COPY.screens.auth.codeSubtitle}
        rightSlot={
          <IconButton
            variant="ghost"
            accessibilityLabel={COPY.actions.cancel}
            onPress={handleClose}
            renderIcon={({ size, color }) => <Feather name="x" size={size} color={color} />}
          />
        }
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.kbAvoid}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <EmailOtpForm
            flow={flow}
            emailHelper={(email) =>
              `Enviámos um código de 6 dígitos para ${email}. O código expira em 10 minutos.`
            }
          />

          <View style={styles.footer}>
            <Text variant="bodySm" color="textMuted" align="center">
              {keepBrowsingLabel}
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
}
