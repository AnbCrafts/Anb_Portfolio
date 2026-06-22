import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://anb-portfolio.onrender.com/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Flag to track token refresh state
let isRefreshing = false;
// Queue to hold requests that failed with 401 while token is being refreshed
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if error is 401 Unauthorized and not already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Don't intercept if it's already a login or refresh request
      if (
        originalRequest.url.includes('/auth/login') ||
        originalRequest.url.includes('/auth/refresh')
      ) {
        return Promise.reject(error);
      }

      if (isRefreshing) {
        // Queue this request and return a promise that resolves when token is refreshed
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            // Re-run the request (cookies will handle credentials automatically)
            return axiosInstance(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Request a new access token using standard axios
        const { data } = await axios.post(
          `${API_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const newAccessToken = data.data?.accessToken || data.accessToken;

        // Process all queued requests
        processQueue(null, newAccessToken);
        isRefreshing = false;

        // Retry the original request
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        isRefreshing = false;

        // Clear local storage token
        localStorage.removeItem('adminToken');

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
