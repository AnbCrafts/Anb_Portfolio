import axiosInstance from '../Axios/axiosInstance';

export const loginInit = async (email, password) => {
  const { data } = await axiosInstance.post('/auth/login/init', { email, password });
  return data;
};

export const loginVerify = async (email, otp) => {
  const { data } = await axiosInstance.post('/auth/login/verify', { email, otp });
  return data;
};

export const forgotPassword = async (email) => {
  const { data } = await axiosInstance.post('/auth/forgot-password', { email });
  return data;
};

export const resetPassword = async (email, otp, newPassword) => {
  const { data } = await axiosInstance.post('/auth/reset-password', { email, otp, newPassword });
  return data;
};

export const logout = async () => {
  const { data } = await axiosInstance.post('/auth/logout');
  return data;
};

export const getProfile = async () => {
  const { data } = await axiosInstance.get('/auth/profile');
  return data;
};

export const updateProfile = async (profileData) => {
  const { data } = await axiosInstance.put('/auth/profile', profileData);
  return data;
};

export const seedAdmin = async () => {
  const { data } = await axiosInstance.post('/auth/seed');
  return data;
};
