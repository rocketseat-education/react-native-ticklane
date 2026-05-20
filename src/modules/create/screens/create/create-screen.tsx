import { Feather } from '@expo/vector-icons';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';

import { Button } from '@/components/button';
import { Container } from '@/components/container';
import { IconButton } from '@/components/icon-button';
import { Input } from '@/components/input';
import { ScreenHeader } from '@/components/screen-header';
import { SectionHeader } from '@/components/section-header';
import { Text } from '@/components/text';
import { COPY } from '@/constants/copy';

import { CategorySelector } from '../../components/category-selector';
import { ItemsEditor } from '../../components/items-editor';
import { TagInput } from '../../components/tag-input';
import { useCreateScreen } from './use-create-screen';

export function CreateScreen() {
  const {
    styles,
    title,
    description,
    selectedCategoryId,
    tags,
    items,
    categories,
    errors,
    screenTitle,
    screenSubtitle,
    sectionsCopy,
    fieldsCopy,
    submitLabel,
    handleTitleChange,
    handleDescriptionChange,
    handleCategorySelect,
    handleAddTag,
    handleRemoveTag,
    handleAddItem,
    handleRemoveItem,
    handleChangeItemTitle,
    handleChangeItemDescription,
    handleClose,
    handleSubmit,
  } = useCreateScreen();

  return (
    <Container paddingVertical="none">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <ScreenHeader
            title={screenTitle}
            subtitle={screenSubtitle}
            rightSlot={
              <IconButton
                variant="ghost"
                accessibilityLabel={COPY.actions.cancel}
                onPress={handleClose}
                renderIcon={({ size, color }) => <Feather name="x" size={size} color={color} />}
              />
            }
          />

          <View style={styles.section}>
            <SectionHeader title={sectionsCopy.details} />
            <Input
              label={fieldsCopy.titleLabel}
              value={title}
              onChangeText={handleTitleChange}
              placeholder={fieldsCopy.titlePlaceholder}
              errorText={errors.title ?? undefined}
            />
            <Input
              label={fieldsCopy.descriptionLabel}
              value={description}
              onChangeText={handleDescriptionChange}
              placeholder={fieldsCopy.descriptionPlaceholder}
              multiline
            />
          </View>

          <View style={styles.section}>
            <SectionHeader title={sectionsCopy.category} />
            <CategorySelector
              categories={categories}
              selectedCategoryId={selectedCategoryId}
              onSelect={handleCategorySelect}
            />
            {errors.category ? (
              <Text variant="caption" color="danger">
                {errors.category}
              </Text>
            ) : null}
          </View>

          <View style={styles.section}>
            <SectionHeader title={sectionsCopy.tags} />
            <TagInput tags={tags} onAdd={handleAddTag} onRemove={handleRemoveTag} />
          </View>

          <View style={styles.section}>
            <SectionHeader title={sectionsCopy.items} />
            <ItemsEditor
              items={items}
              onChangeItemTitle={handleChangeItemTitle}
              onChangeItemDescription={handleChangeItemDescription}
              onRemoveItem={handleRemoveItem}
              onAddItem={handleAddItem}
            />
            {errors.items ? (
              <Text variant="caption" color="danger">
                {errors.items}
              </Text>
            ) : null}
          </View>

          <Button label={submitLabel} onPress={handleSubmit} isFullWidth />
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
}
