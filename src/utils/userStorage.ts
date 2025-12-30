import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_KEY = 'USER_PROFILE';

export const saveUserProfile = async (user: {
  id: string;
  email: string;
  created_at: string;
  name?: string | null;
}) => {
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const saveUserToLocal = async (user: any) => {
  try {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (e) {
    console.log('Save user error', e);
  }
};

export const getUserFromLocal = async () => {
  try {
    const data = await AsyncStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    return null;
  }
};

export const getUserProfile = async () => {
  const data = await AsyncStorage.getItem(USER_KEY);
  return data ? JSON.parse(data) : null;
};

export const clearUserProfile = async () => {
  await AsyncStorage.removeItem(USER_KEY);
};
