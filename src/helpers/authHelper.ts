import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUserStore} from '../store/useUserStore';

export const authHeader = async () => {
  const user = await AsyncStorage.getItem('user');
  const token = await AsyncStorage.getItem('token');

  if (token != null) {
    return `Bearer ${token}`;
  } else {
    return '';
  }
};
