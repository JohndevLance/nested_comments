// components/NumberInputField.tsx
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

export function NumberInputField<T extends FieldValues>({
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
          keyboardType="numeric"
          onChangeText={text => onChange(text.replace(/[^0-9]/g, ''))}
          onBlur={onBlur}
          value={value}
          errorMessage={error?.message}
        />
      )}
    />
  );
}
