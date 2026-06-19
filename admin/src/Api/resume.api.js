import axiosInstance from '../Axios/axiosInstance';

export const getAllResumes = async () => {
  const { data } = await axiosInstance.get('/resumes');
  return data;
};

export const getActiveResume = async () => {
  const { data } = await axiosInstance.get('/resumes/active');
  return data;
};

export const createResume = async (resumeData) => {
  const { data } = await axiosInstance.post('/resumes', resumeData);
  return data;
};

export const updateResume = async (id, resumeData) => {
  const { data } = await axiosInstance.put(`/resumes/${id}`, resumeData);
  return data;
};

export const deleteResume = async (id) => {
  const { data } = await axiosInstance.delete(`/resumes/${id}`);
  return data;
};
