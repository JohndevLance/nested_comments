import {useMutation, useQuery} from '@tanstack/react-query';
import {axiosAuthApi} from '../services/httpClient';
import {LoginPayload} from '../types';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const login = async (payload: LoginPayload) => {
  try {
    const response = await axiosAuthApi.post('auth/login', payload);
    return response.data;
  } catch (error) {
    throw error; // Pass error up to the caller
  }
};

export const useloginMutation = () => {
  return useMutation({
    mutationFn: login,
    onSuccess: data => {
      AsyncStorage.setItem('token', data.authToken);
    },
  });
};
export const logout = async () => {
  const response = await axiosAuthApi.post('/auth/logout');
  return response.data;
};
