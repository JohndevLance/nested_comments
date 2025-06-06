// components/PasswordInputField.tsx
import React, {useState} from 'react';
import {Controller, Control, FieldValues} from 'react-hook-form';
import {Input, Icon} from 'react-native-elements';

interface Props<T extends FieldValues> {
  name: keyof T;
  control: Control<T>;
  placeholder: string;
  label?: string;
  rules?: object;
}

export function PasswordInputField<T extends FieldValues>({
  name,
  control,
  placeholder,
  label,
  rules,
}: Props<T>) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Controller
      control={control}
      name={name as string}
      rules={rules}
      render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
        <Input
          label={label}
          placeholder={placeholder}
          secureTextEntry={!showPassword}
          onChangeText={onChange}
          onBlur={onBlur}
          value={value}
          rightIcon={
            <Icon
              type="material"
              name={showPassword ? 'visibility' : 'visibility-off'}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
          errorMessage={error?.message}
        />
      )}
    />
  );
}
