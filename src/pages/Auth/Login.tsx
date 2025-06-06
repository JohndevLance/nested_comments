import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Input, Button, Text} from 'react-native-elements';
import {useForm, Controller} from 'react-hook-form';
import {useUserStore} from '../../store/useUserStore';
import {PasswordInputField} from '../../components/PasswordInputField';
import {TextInputField} from '../../components/TextInputField';
import {LoginPayload} from '../../types';
import Toast from 'react-native-toast-message';
import {useloginMutation} from '../../api/auth';
import {useNavigation} from '@react-navigation/native';

export default function Login() {
  const loginMutation = useloginMutation();
  const navigation = useNavigation();
  const login = useUserStore(state => state.login);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = ({email, password}: LoginPayload) => {
    const loginPayload: LoginPayload = {
      user_handle: email,
      password: password,
    };
    loginMutation.mutate(loginPayload, {
      onSuccess: data => {
        console.log('Login successful:', data);
        login({
          token: data?.authToken,
        });
      },
      onError: error => {
        console.error('Login failed:', error);

        Toast.show({
          type: 'error',
          text1: 'Login Failed',
          text2: error.message || 'An error occurred during login.',
        });
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text h4 style={styles.title}>
        Welcome! Please log in.
      </Text>

      <TextInputField
        name="email"
        control={control}
        placeholder="Email/Username"
        label="Email"
        rules={{
          required: 'Email/Username is required',
        }}
      />

      <PasswordInputField
        name="password"
        control={control}
        placeholder="Password"
        label="Password"
        rules={{required: 'Password is required'}}
      />

      <Button
        title="Login"
        onPress={handleSubmit(onSubmit)}
        containerStyle={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', paddingHorizontal: 20},
  title: {textAlign: 'center', marginBottom: 20},
  button: {marginTop: 20},
});
