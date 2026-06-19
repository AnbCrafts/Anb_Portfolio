import axiosInstance from '../Axios/axiosInstance';

export const getAllCertificates = async (params = {}) => {
  const { data } = await axiosInstance.get('/certificates', { params });
  return data;
};

export const getCertificateById = async (id) => {
  const { data } = await axiosInstance.get(`/certificates/${id}`);
  return data;
};

export const createCertificate = async (certificateData) => {
  const { data } = await axiosInstance.post('/certificates', certificateData);
  return data;
};

export const updateCertificate = async (id, certificateData) => {
  const { data } = await axiosInstance.put(`/certificates/${id}`, certificateData);
  return data;
};

export const deleteCertificate = async (id) => {
  const { data } = await axiosInstance.delete(`/certificates/${id}`);
  return data;
};
