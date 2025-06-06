// components/TextInputField.tsx
import React from 'react';
import {Controller, Control, FieldValues} from 'react-hook-form';
import {Input} from 'react-native-elements';

interface Props<T extends FieldValues> {
  name: keyof T;
  control: Control<T>;
  placeholder: string;
  label?: string;
  rules?: object;
}

export function TextInputField<T extends FieldValues>({
  name,
  control,
  placeholder,
  label,
  rules,
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
          onChangeText={onChange}
          onBlur={onBlur}
          value={value}
          autoCapitalize="none"
          errorMessage={error?.message}
        />
      )}
    />
  );
}
