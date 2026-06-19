import axiosInstance from '../Axios/axiosInstance';

export const getActiveResume = async () => {
  const { data } = await axiosInstance.get('/resumes/active');
  return data;
};
