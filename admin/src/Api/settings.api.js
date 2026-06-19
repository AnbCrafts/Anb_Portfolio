import axiosInstance from '../Axios/axiosInstance';

export const getSettings = async () => {
  const { data } = await axiosInstance.get('/settings');
  return data;
};

export const updateSettings = async (settingsData) => {
  const { data } = await axiosInstance.put('/settings', settingsData);
  return data;
};
