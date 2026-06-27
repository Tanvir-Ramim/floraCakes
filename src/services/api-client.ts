import axios from "axios";

// export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
// export const API_BASE_URL = "http://localhost:8080/borsalle/v1"; // Replace with your actual API base URL
export const API_BASE_URL = "https://borsalleserver.onrender.com/borsalle/v1"; // Replace with your actual API base URL

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  // Remove default Content-Type header to allow dynamic setting
});

// Only attach token if window is defined (client-side only)
if (typeof window !== "undefined") {
  apiClient.interceptors.request.use(
    async (config) => {
      const token = localStorage.getItem("authToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      // Dynamic Content-Type based on request data
      if (config.data instanceof FormData) {
        config.headers["Content-Type"] = "multipart/form-data";
        config.timeout = 30000;
      } else {
        config.headers["Content-Type"] = "application/json";
      }
      // Get client IP address
      try {
        const ipResponse = await axios.get("https://api.ipify.org?format=json");
        if (ipResponse.data && ipResponse.data.ip) {
          config.headers["client-ip"] = ipResponse.data.ip;
        }
      } catch (error) {
        console.error("Could not fetch client IP:", error);

        config.headers["client-ip"] = "";
      }

      return config;
    },
    (error) => Promise.reject(error),
  );
}

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
  },
);

// Optional: Create a separate file upload client if you prefer
export const fileUploadClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// Add token interceptor for file upload client too
if (typeof window !== "undefined") {
  fileUploadClient.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("authToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );
}

fileUploadClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
  },
);

export default apiClient;
