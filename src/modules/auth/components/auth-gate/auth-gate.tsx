import { Feather } from '@expo/vector-icons';
import { Pressable, View } from 'react-native';

import { BottomSheet } from '@/components/bottom-sheet';
import { Text } from '@/components/text';

import { EmailOtpForm } from '../email-otp-form';
import { useAuthGate } from './use-auth-gate';

export function AuthGate() {
  const {
    styles,
    isVisible,
    title,
    description,
    cancelLabel,
    iconColor,
    iconSize,
    isBusy,
    flow,
    handleCancel,
  } = useAuthGate();

  return (
    <BottomSheet visible={isVisible} onRequestClose={handleCancel} closeOnBackdropPress={!isBusy}>
      <View style={styles.kbAvoid}>
        <View style={styles.header}>
          <View style={styles.iconWrapper}>
            <Feather name="mail" size={iconSize} color={iconColor} />
          </View>
          <Text variant="h2" align="center">
            {title}
          </Text>
          <Text variant="body" color="textMuted" align="center">
            {description}
          </Text>
        </View>

        <EmailOtpForm
          flow={flow}
          emailHelper={(email) =>
            `Enviámos um código de 6 dígitos para ${email}. Expira em 10 minutos.`
          }
        />

        <Pressable
          accessibilityRole="button"
          onPress={handleCancel}
          disabled={isBusy}
          style={styles.cancelButton}
        >
          <Text variant="bodyMedium" color="textMuted">
            {cancelLabel}
          </Text>
        </Pressable>
      </View>
    </BottomSheet>
  );
}
