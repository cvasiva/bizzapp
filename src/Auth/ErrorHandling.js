/* eslint-disable prettier/prettier */
import {getCurrentUser} from './auth';
import axios from './axiosInstance';

export const postErrorToBackend = errorPayload => {
  const url = '/log';
  axios
    .post(url, errorPayload, {
      headers: {
        Authorization: 'Bearer ' + getCurrentUser().token,
      },
    })
    .then(response => {});
};
