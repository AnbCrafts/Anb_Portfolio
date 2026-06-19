import axiosInstance from '../Axios/axiosInstance';

export const getAllProjects = async (params = {}) => {
  const { data } = await axiosInstance.get('/projects', { params });
  return data;
};

export const getProjectById = async (id) => {
  const { data } = await axiosInstance.get(`/projects/${id}`);
  return data;
};

export const createProject = async (projectData) => {
  const { data } = await axiosInstance.post('/projects', projectData);
  return data;
};

export const updateProject = async (id, projectData) => {
  const { data } = await axiosInstance.put(`/projects/${id}`, projectData);
  return data;
};

export const deleteProject = async (id) => {
  const { data } = await axiosInstance.delete(`/projects/${id}`);
  return data;
};
