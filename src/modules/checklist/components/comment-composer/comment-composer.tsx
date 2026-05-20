import { Feather } from '@expo/vector-icons';
import { Modal, Pressable, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { Avatar } from '@/components/avatar';
import { Text } from '@/components/text';

import type { CommentTarget } from '@/state/library';

import { useCommentComposer } from './use-comment-composer';

export type CommentComposerProps = {
  target: CommentTarget;
};

export function CommentComposer({ target }: CommentComposerProps) {
  const {
    styles,
    placeholder,
    placeholderColor,
    text,
    canSubmit,
    submitIconColor,
    cancelIconColor,
    iconSize,
    avatarInitials,
    avatarName,
    triggerAccessibilityLabel,
    submitAccessibilityLabel,
    cancelAccessibilityLabel,
    modalTitle,
    isModalVisible,
    inputRef,
    headerHitSlop,
    handleOpen,
    handleClose,
    handleModalShown,
    handleChangeText,
    handleSubmit,
  } = useCommentComposer({ target });

  const insets = useSafeAreaInsets();

  return (
    <>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={triggerAccessibilityLabel}
        onPress={handleOpen}
        style={styles.triggerRoot}
      >
        <Avatar size="sm" name={avatarName} initials={avatarInitials} />
        <View style={styles.triggerField}>
          <Text variant="body" style={{ color: placeholderColor }}>
            {placeholder}
          </Text>
        </View>
      </Pressable>

      <Modal
        transparent
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={handleClose}
        statusBarTranslucent
        onShow={handleModalShown}
      >
        <SafeAreaView style={styles.safeAreaView}>
            <TouchableWithoutFeedback onPress={handleClose}>
              <View style={styles.modalBackdrop} />
            </TouchableWithoutFeedback>

            <View style={styles.modalSheet}>
              <View style={styles.modalHeader}>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={cancelAccessibilityLabel}
                  onPress={handleClose}
                  hitSlop={headerHitSlop}
                  style={styles.modalHeaderButton}
                >
                  <Feather name="x" size={iconSize} color={cancelIconColor} />
                </Pressable>
                <Text variant="bodyMedium">{modalTitle}</Text>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={submitAccessibilityLabel}
                  accessibilityState={{ disabled: !canSubmit }}
                  onPress={handleSubmit}
                  hitSlop={headerHitSlop}
                  focusable={false}
                  android_disableSound={true}
                  style={[styles.modalHeaderButton, !canSubmit && styles.modalHeaderSendDisabled]}
                >
                  <Feather name="send" size={iconSize} color={submitIconColor} />
                </Pressable>
              </View>

              <View style={styles.modalInputShell}>
                <TextInput
                  // ref={inputRef}
                  // autoFocus={Platform.OS === 'ios'}
                  // showSoftInputOnFocus={true}
                  value={text}
                  // multiline={true}
                  onChangeText={handleChangeText}
                  placeholder={placeholder}
                  placeholderTextColor={placeholderColor}
                  style={styles.modalInput}
                  onSubmitEditing={handleSubmit}
                  // submitBehavior="blurAndSubmit"
                />
              </View>
            </View>
          </SafeAreaView>
      </Modal>
    </>
  );
}



