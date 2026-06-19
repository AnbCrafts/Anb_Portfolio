import axiosInstance from '../Axios/axiosInstance';

export const getAllContacts = async (params = {}) => {
  const { data } = await axiosInstance.get('/contacts', { params });
  return data;
};

export const updateContactStatus = async (id, status) => {
  const { data } = await axiosInstance.put(`/contacts/${id}`, { status });
  return data;
};

export const deleteContact = async (id) => {
  const { data } = await axiosInstance.delete(`/contacts/${id}`);
  return data;
};
