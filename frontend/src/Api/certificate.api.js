import axiosInstance from '../Axios/axiosInstance';

export const getCertificates = async () => {
  const { data } = await axiosInstance.get('/certificates');
  return data;
};
