import axios from "axios";

// Create the axios instance
const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // change this during deployment
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the access token in headers
API.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("doc-flow-access-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Add a response interceptor to handle token refresh when unauthorized (401)
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error status is 401 (Unauthorized) and we haven't refreshed the token yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Set retry flag to true

      try {
        const refreshToken = localStorage.getItem("doc-flow-refresh-token"); // Assuming the refresh token is saved in localStorage
        if (!refreshToken) {
          throw new Error("Refresh token is not available");
        }
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

        // Request a new access token using the refresh token
        const response = await axios.post(`${baseUrl}/auth/refresh`, {
          refreshToken,
        });

        const newAccessToken = response.data.accessToken;

        // Save the new access token to localStorage
        localStorage.setItem("doc-flow-access-token", newAccessToken);

        // Update the original request with the new access token
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        // Retry the original request with the new access token
        return axios(originalRequest);
      } catch (refreshError) {
        console.error("Failed to refresh token", refreshError);
        window.location.href = "/login"; // Redirect to login if token refresh fails
        return Promise.reject(refreshError);
      }
    }

    // If the error is not 401 or token refresh fails, reject the promise
    return Promise.reject(error);
  }
);

export default API;
