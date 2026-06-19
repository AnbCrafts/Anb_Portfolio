import axiosInstance from '../Axios/axiosInstance';

export const getDashboardAnalytics = async () => {
  const { data } = await axiosInstance.get('/dashboard/analytics');
  return data;
};
