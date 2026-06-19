import axiosInstance from '../Axios/axiosInstance';

export const getAllMedia = async (params = {}) => {
  const { data } = await axiosInstance.get('/media', { params });
  return data;
};

export const uploadMedia = async (formData) => {
  const { data } = await axiosInstance.post('/media/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

export const deleteMedia = async (id) => {
  const { data } = await axiosInstance.delete(`/media/${id}`);
  return data;
};
