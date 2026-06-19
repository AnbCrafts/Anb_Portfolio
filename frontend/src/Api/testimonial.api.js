import axiosInstance from '../Axios/axiosInstance';

export const getTestimonials = async () => {
  const { data } = await axiosInstance.get('/testimonials');
  return data;
};
