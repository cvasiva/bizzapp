/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to retrieve user data from AsyncStorage
export const getUser = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('register');
    if (jsonValue) {
      const user = JSON.parse(jsonValue);
      // Ensure user object contains expected properties
      return user && user.token ? user : {};
    }
    return {};
  } catch (error) {
    console.error('Error retrieving user from AsyncStorage:', error);
    return {};
  }
};

// Function to get the current user, ensuring the user has a token
export const getCurrentUser = async () => {
  const user = await getUser();
  if (user && user.token) {
    return user;
  } else {
    throw new Error('User token not found');
  }
};

// Function to log out and clear user data
export const logout = async () => {
  try {
    await AsyncStorage.removeItem('register');
  } catch (error) {
    console.error('Error clearing user data from AsyncStorage:', error);
  }
};

// Function to set user data in AsyncStorage
export const setUser = async user => {
  try {
    if (user && user.token) {
      await AsyncStorage.setItem('register', JSON.stringify(user));
    } else {
      // Clear user data if invalid or no token
      await AsyncStorage.removeItem('register');
    }
  } catch (error) {
    console.error('Error saving user data to AsyncStorage:', error);
  }
};

export const setInvoiceData = async (data) => {
  try {
    await AsyncStorage.setItem('payroll_data', JSON.stringify(data));
    console.log('Payroll data saved successfully.');
  } catch (error) {
    console.error('Error saving payroll data:', error);
  }
};

