import axiosInstance from '../Axios/axiosInstance';

export const getStories = async (params = {}) => {
  const { data } = await axiosInstance.get('/stories', { params });
  return data;
};

export const getStoryBySlug = async (slug) => {
  const { data } = await axiosInstance.get(`/stories/slug/${slug}`);
  return data;
};
