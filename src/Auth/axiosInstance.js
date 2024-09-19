/* eslint-disable prettier/prettier */
import Axios from 'axios';
import {logout} from './auth';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const axios = Axios.create({
  baseURL: 'https://staging.api.skill-elevator.com',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    // eslint-disable-next-line yoda
    if (401 === error.response.status) {
      logout();
      Alert.alert(
        'Session Expired',
        'Your session has expired. Please log in again.',
        [
          {
            text: 'OK',
            onPress: () => {
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const navigation = useNavigation();
              navigation.navigate('Login');
            },
          },
        ],
      );
    } else {
      return Promise.reject(error);
    }
  },
);

export default axios;
