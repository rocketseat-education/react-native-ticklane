import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { Keyboard, Modal, Platform, Pressable, ScrollView, View, useWindowDimensions } from 'react-native';

import { useBottomSheet } from './use-bottom-sheet';

export type BottomSheetProps = {
  visible: boolean;
  onRequestClose: () => void;
  children: ReactNode;
  closeOnBackdropPress?: boolean;
};

export function BottomSheet({
  visible,
  onRequestClose,
  children,
  closeOnBackdropPress = true,
}: BottomSheetProps) {
  const { height: windowHeight } = useWindowDimensions();
  const [iosKeyboardInset, setIosKeyboardInset] = useState(0);
  const { styles, handleBackdropPress } = useBottomSheet({
    onRequestClose,
    closeOnBackdropPress,
  });

  useEffect(() => {
    if (Platform.OS !== 'ios') {
      return undefined;
    }

    const show = Keyboard.addListener('keyboardWillShow', (event) => {
      setIosKeyboardInset(event.endCoordinates.height);
    });
    const hide = Keyboard.addListener('keyboardWillHide', () => {
      setIosKeyboardInset(0);
    });

    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  useEffect(() => {
    if (!visible && Platform.OS === 'ios') {
      setIosKeyboardInset(0);
    }
  }, [visible]);

  const inset = Platform.OS === 'ios' ? iosKeyboardInset : 0;
  const visibleViewport = Math.max(windowHeight - inset, 0);
  const sheetMaxHeight = Math.min(
    windowHeight * 0.92,
    Math.max(visibleViewport - 16, 120),
  );
  const sheetScrollMaxHeight = Math.max(sheetMaxHeight - 48, 100);

  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={onRequestClose}
      statusBarTranslucent
    >
      <View
        style={[
          styles.keyboardRoot,
          Platform.OS === 'ios' ? { paddingBottom: iosKeyboardInset } : null,
        ]}
      >
        <View style={styles.backdrop}>
          <Pressable
            accessibilityRole="button"
            style={styles.backdropPressable}
            onPress={handleBackdropPress}
          />
          <View style={[styles.sheet, { maxHeight: sheetMaxHeight }]}>
            <View style={styles.handle} />
            <ScrollView
              keyboardShouldPersistTaps="handled"
              keyboardDismissMode="interactive"
              showsVerticalScrollIndicator={false}
              bounces={false}
              style={{ maxHeight: sheetScrollMaxHeight }}
              contentContainerStyle={styles.sheetScrollContent}
            >
              {children}
            </ScrollView>
          </View>
        </View>
      </View>
    </Modal>
  );
}
