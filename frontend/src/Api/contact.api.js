import axiosInstance from '../Axios/axiosInstance';

export const sendContactMessage = async (messageData) => {
  const { data } = await axiosInstance.post('/contacts', messageData);
  return data;
};
