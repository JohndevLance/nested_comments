// components/TextAreaField.tsx
import React from 'react';
import {Controller, Control, FieldValues} from 'react-hook-form';
import {Input} from 'react-native-elements';

interface Props<T extends FieldValues> {
  name: keyof T;
  control: Control<T>;
  placeholder: string;
  label?: string;
  rules?: object;
  numberOfLines?: number;
}

export function TextAreaField<T extends FieldValues>({
  name,
  control,
  placeholder,
  label,
  rules,
  numberOfLines = 4,
}: Props<T>) {
  return (
    <Controller
      control={control}
      name={name as string}
      rules={rules}
      render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
        <Input
          label={label}
          placeholder={placeholder}
          multiline
          numberOfLines={numberOfLines}
          onChangeText={onChange}
          onBlur={onBlur}
          value={value}
          errorMessage={error?.message}
          inputStyle={{minHeight: numberOfLines * 20, textAlignVertical: 'top'}}
        />
      )}
    />
  );
}
