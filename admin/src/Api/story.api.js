import axiosInstance from '../Axios/axiosInstance';

export const getAllStories = async (params = {}) => {
  const { data } = await axiosInstance.get('/stories', { params });
  return data;
};

export const getStoryById = async (id) => {
  const { data } = await axiosInstance.get(`/stories/${id}`);
  return data;
};

export const createStory = async (storyData) => {
  const { data } = await axiosInstance.post('/stories', storyData);
  return data;
};

export const updateStory = async (id, storyData) => {
  const { data } = await axiosInstance.put(`/stories/${id}`, storyData);
  return data;
};

export const deleteStory = async (id) => {
  const { data } = await axiosInstance.delete(`/stories/${id}`);
  return data;
};
