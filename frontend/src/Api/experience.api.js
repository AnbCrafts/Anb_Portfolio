import axiosInstance from '../Axios/axiosInstance';

export const getExperiences = async () => {
  const { data } = await axiosInstance.get('/experience');
  return data;
};
