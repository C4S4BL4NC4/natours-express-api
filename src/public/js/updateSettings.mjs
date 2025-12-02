/* eslint-disable */

import axios from 'https://cdnjs.cloudflare.com/ajax/libs/axios/1.10.0/esm/axios.js';

import { showAlert } from './alerts.mjs';

// type is either 'password' or 'data'
export const updateSettings = async (data, type) => {
  try {
    // http://127.0.0.1:3000/api/v1/users/updatePassword updateMe
    const res = await axios({
      method: 'PATCH',
      url: `http://127.0.0.1:3000/api/v1/users/${type === 'password' ? 'updatePassword' : 'updateMe'}`,
      data
    });

    if (res.data.status === 'success') {
      showAlert('success', `${type.toUpperCase()} updated successfully!`);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
