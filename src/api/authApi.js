import api from './api.js';

export const loginUserApi = (credentials) => {
  return api.post('/auth/login', credentials);
};

export const registerUserApi = (formData) => {
  return api.post('/auth/register', formData);
};

export const getProfileApi = () => {
  return api.get('/users/me');
};

export const logoutApi = () => {
  localStorage.removeItem('token');
  return Promise.resolve();
};
