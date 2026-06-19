import axiosInstance from '../Axios/axiosInstance';

export const getProjects = async (params = {}) => {
  const { data } = await axiosInstance.get('/projects', { params });
  return data;
};

export const getProjectBySlug = async (slug) => {
  const { data } = await axiosInstance.get(`/projects/slug/${slug}`);
  return data;
};
