import axiosInstance from '../Axios/axiosInstance';

export const getSettings = async () => {
  const { data } = await axiosInstance.get('/settings');
  return data;
};
