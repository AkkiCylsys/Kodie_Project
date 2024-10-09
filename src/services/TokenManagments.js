import AsyncStorage from '@react-native-async-storage/async-storage';
 
// Function to get token from storage
export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    return token;
  } catch (error) {
    console.error('Error fetching token from storage', error);
    return null;
  }
};
 
// Function to set token in storage
export const setToken = async (token) => {
  try {
    await AsyncStorage.setItem('userToken', token);
  } catch (error) {
    console.error('Error saving token', error);
  }
};
 
// Function to remove token from storage
export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('userToken');
  } catch (error) {
    console.error('Error removing token', error);
  }
};