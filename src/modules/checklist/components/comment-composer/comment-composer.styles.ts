import { StyleSheet, type TextStyle, type ViewStyle } from 'react-native';

import type { Theme } from '@/theme';

export const createStyles = (theme: Theme) => {
  const triggerRoot: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  };

  const triggerField: ViewStyle = {
    flex: 1,
    minHeight: theme.sizes.controlMd,
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.radii.lg,
    borderWidth: theme.sizes.borderThin,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
  };

  const modalKeyboardRoot: ViewStyle = {
    flex: 1,
    backgroundColor: theme.colors.overlay,
  };

  const modalBackdrop: ViewStyle = {
    flex: 1,
    zIndex: 0,
  };

  const safeAreaView: ViewStyle = {
    flex: 1,
  };

  const modalContent: ViewStyle = {
    flex: 1,
    justifyContent: 'flex-end',
  };

  const modalSheet: ViewStyle = {
    zIndex: 1,
    elevation: 12,
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: theme.radii.xl,
    borderTopRightRadius: theme.radii.xl,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.lg,
    gap: theme.spacing.md,
    borderTopWidth: theme.sizes.borderHairline,
    borderColor: theme.colors.border,
  };

  const modalHeader: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  const modalHeaderButton: ViewStyle = {
    minWidth: theme.sizes.controlMd,
    minHeight: theme.sizes.controlMd,
    alignItems: 'center',
    justifyContent: 'center',
  };

  const modalInputShell: ViewStyle = {
    borderRadius: theme.radii.lg,
    borderWidth: theme.sizes.borderHairline,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surfaceMuted,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  };

  const modalInput: TextStyle = {
    minHeight: theme.sizes.controlLg * 2,
    fontFamily: theme.typography.family.sans,
    fontSize: theme.typography.variants.body.fontSize,
    lineHeight: theme.typography.variants.body.lineHeight,
    color: theme.colors.text,
    paddingVertical: theme.spacing.xs,
    textAlignVertical: 'top',
  };

  const modalHeaderSendDisabled: ViewStyle = {
    opacity: 0.45,
  };

  return StyleSheet.create({
    triggerRoot,
    triggerField,
    modalKeyboardRoot,
    modalBackdrop,
    modalContent,
    modalSheet,
    modalHeader,
    modalHeaderButton,
    modalHeaderSendDisabled,
    modalInputShell,
    modalInput,
    safeAreaView,
  });
};
