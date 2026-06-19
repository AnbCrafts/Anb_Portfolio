import axiosInstance from '../Axios/axiosInstance';

export const getAllExperiences = async (params = {}) => {
  const { data } = await axiosInstance.get('/experience', { params });
  return data;
};

export const getExperienceById = async (id) => {
  const { data } = await axiosInstance.get(`/experience/${id}`);
  return data;
};

export const createExperience = async (experienceData) => {
  const { data } = await axiosInstance.post('/experience', experienceData);
  return data;
};

export const updateExperience = async (id, experienceData) => {
  const { data } = await axiosInstance.put(`/experience/${id}`, experienceData);
  return data;
};

export const deleteExperience = async (id) => {
  const { data } = await axiosInstance.delete(`/experience/${id}`);
  return data;
};
