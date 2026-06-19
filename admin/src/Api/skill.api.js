import axiosInstance from '../Axios/axiosInstance';

export const getAllSkills = async (params = {}) => {
  const { data } = await axiosInstance.get('/skills', { params });
  return data;
};

export const getSkillById = async (id) => {
  const { data } = await axiosInstance.get(`/skills/${id}`);
  return data;
};

export const createSkill = async (skillData) => {
  const { data } = await axiosInstance.post('/skills', skillData);
  return data;
};

export const updateSkill = async (id, skillData) => {
  const { data } = await axiosInstance.put(`/skills/${id}`, skillData);
  return data;
};

export const deleteSkill = async (id) => {
  const { data } = await axiosInstance.delete(`/skills/${id}`);
  return data;
};
