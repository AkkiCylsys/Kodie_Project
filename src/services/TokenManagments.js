import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to get token, device ID, and device type from storage
export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    const deviceId = await AsyncStorage.getItem('deviceId');
    const deviceType = await AsyncStorage.getItem('deviceType');

    return { token, deviceId, deviceType }; // Return an object with all three values
  } catch (error) {
    console.error('Error fetching data from storage', error);
    return null;
  }
};

// Function to set token, device ID, and device type in storage
export const setToken = async (token, deviceId, deviceType) => {
  try {
    await AsyncStorage.setItem('userToken', token);
    await AsyncStorage.setItem('deviceId', deviceId);
    await AsyncStorage.setItem('deviceType', deviceType);
  } catch (error) {
    console.error('Error saving token and device info', error);
  }
};

// Function to remove token, device ID, and device type from storage
export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('deviceId');
    await AsyncStorage.removeItem('deviceType');
  } catch (error) {
    console.error('Error removing token and device info', error);
  }
};
