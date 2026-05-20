import { Feather } from '@expo/vector-icons';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  View,
} from 'react-native';

import { Avatar } from '@/components/avatar';
import { Button } from '@/components/button';
import { Container } from '@/components/container';
import { IconButton } from '@/components/icon-button';
import { Input } from '@/components/input';
import { ScreenHeader } from '@/components/screen-header';
import { Text } from '@/components/text';
import { COPY } from '@/constants/copy';
import { useTheme } from '@/theme/use-theme';

import { useProfileEditScreen } from './use-profile-edit-screen';

export function ProfileEditScreen() {
  const {
    styles,
    copy,
    authResolved,
    isAuthenticated,
    currentUser,
    displayName,
    bio,
    feedback,
    saving,
    pendingAvatar,
    dirty,
    setDisplayName,
    setBio,
    handleSubmit,
    handlePickAvatar,
    handleRemoveAvatar,
    handleClose,
    MAX_BIO,
    MAX_DISPLAY_NAME,
  } = useProfileEditScreen();
  const { theme } = useTheme();

  if (!authResolved) {
    return (
      <Container>
        <Text variant="bodySm" color="textMuted">
          A carregar perfil…
        </Text>
      </Container>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Container>
      <ScreenHeader
        title={copy.title}
        subtitle={copy.subtitle}
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
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.avatarBlock}>
            <Avatar
              size="xl"
              name={currentUser.displayName}
              initials={currentUser.initials}
              imageUrl={currentUser.avatarUrl}
            />
            <View style={styles.avatarActions}>
              <Button
                variant="secondary"
                size="md"
                label={
                  pendingAvatar === 'upload'
                    ? copy.avatarUploadingLabel
                    : currentUser.avatarUrl
                      ? copy.avatarChangeCta
                      : copy.avatarUploadCta
                }
                isLoading={pendingAvatar === 'upload'}
                isDisabled={pendingAvatar !== null}
                onPress={handlePickAvatar}
              />
              {currentUser.avatarUrl ? (
                <Button
                  variant="ghost"
                  size="md"
                  label={
                    pendingAvatar === 'delete'
                      ? copy.avatarRemovingLabel
                      : copy.avatarRemoveCta
                  }
                  isLoading={pendingAvatar === 'delete'}
                  isDisabled={pendingAvatar !== null}
                  onPress={handleRemoveAvatar}
                />
              ) : null}
            </View>
            <Text variant="caption" color="textSubtle" align="center">
              {copy.avatarHelper}
            </Text>
          </View>

          {feedback ? (
            <Text
              variant="bodySm"
              color={
                feedback.kind === 'error'
                  ? 'danger'
                  : feedback.kind === 'success'
                    ? 'success'
                    : 'textMuted'
              }
            >
              {feedback.text}
            </Text>
          ) : null}

          <View style={styles.formBlock}>
            <Input
              label={copy.nameLabel}
              value={displayName}
              onChangeText={setDisplayName}
              maxLength={MAX_DISPLAY_NAME}
              autoCapitalize="words"
              helperText={copy.nameHelper}
              editable={!saving}
            />

            <View>
              <Text variant="caption" color="textMuted">
                {copy.bioLabel}
              </Text>
              <TextInput
                value={bio}
                onChangeText={setBio}
                maxLength={MAX_BIO}
                placeholder={copy.bioPlaceholder}
                placeholderTextColor={theme.colors.textSubtle}
                multiline
                numberOfLines={4}
                editable={!saving}
                style={styles.textarea}
              />
              <Text variant="caption" color="textSubtle">
                {copy.bioHelper(bio.trim().length, MAX_BIO)}
              </Text>
            </View>
          </View>

          <View style={styles.submitRow}>
            <Button
              variant="primary"
              size="lg"
              isFullWidth
              label={saving ? copy.savingLabel : copy.saveCta}
              isLoading={saving}
              isDisabled={saving || !dirty}
              onPress={handleSubmit}
            />
            <Button
              variant="ghost"
              size="md"
              isFullWidth
              label={copy.cancelCta}
              onPress={handleClose}
              isDisabled={saving}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
}
