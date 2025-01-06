/***** Note: Axios Configuration File *****/
import axios from "axios";

const urls = {
  localHostUrl: process.env.NEXT_PUBLIC_LOCAL_HOST_URL,
  // hostedUrl: "https://connect.uzairbaig.com:51003/api",
  // hostedUrl: "http://connect.uzairbaig.com:5107/api"
  // hostedUrl: "http://connect.uzairbaig.com:5108/api",
  hostedUrl: "http://connect.qbscocloud.net:9080/api",
};

// Default config options
const defaultOptions = {
  baseURL: urls.hostedUrl,
  headers: {
    "Content-Type": "application/json",
    DeviceId:
      typeof window !== "undefined" ? window.navigator.userAgent : "server",
  },
};

// Create axios instance
const instance = axios.create(defaultOptions);

// Set the AUTH token for any request
instance.interceptors.request.use((config) => {
  const fetchToken = localStorage.getItem("AuthToken");
  config.headers.Authorization = fetchToken ? `Bearer ${fetchToken}` : "";
  return config;
});

// Intercept the response to handle token expiration
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.error("Request error:", error);
    const originalRequest = error.config;

    // Handle 401 Unauthorized response
    if (
      error.response?.status === 401 ||
      (error.response?.status === 403 && !originalRequest._retry)
    ) {
      originalRequest._retry = true;

      // Clear cookies
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });

      // Clear local storage
      localStorage.clear();
      window.location.href = "/";

      // Optionally, redirect to login page or any other action

      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default instance;
