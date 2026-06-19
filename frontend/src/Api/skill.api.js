import axiosInstance from '../Axios/axiosInstance';

export const getSkills = async () => {
  const { data } = await axiosInstance.get('/skills');
  return data;
};
