import axiosInstance from '../Axios/axiosInstance';

export const getAllTestimonials = async (params = {}) => {
  const { data } = await axiosInstance.get('/testimonials', { params });
  return data;
};

export const getTestimonialById = async (id) => {
  const { data } = await axiosInstance.get(`/testimonials/${id}`);
  return data;
};

export const createTestimonial = async (testimonialData) => {
  const { data } = await axiosInstance.post('/testimonials', testimonialData);
  return data;
};

export const updateTestimonial = async (id, testimonialData) => {
  const { data } = await axiosInstance.put(`/testimonials/${id}`, testimonialData);
  return data;
};

export const deleteTestimonial = async (id) => {
  const { data } = await axiosInstance.delete(`/testimonials/${id}`);
  return data;
};
