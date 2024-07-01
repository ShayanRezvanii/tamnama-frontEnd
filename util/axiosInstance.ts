/** @format */

import Cookies from "js-cookie";
import axios from "axios";
import { redirect } from "next/navigation";

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Add an interceptor to set the authorization header before each request
axiosInstance.interceptors.request.use(
  (config) => {
    // Check if the token is available in your storage (localStorage, sessionStorage, etc.)
    const token = Cookies.get("token"); // Change 'yourAuthToken' to your actual token key

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// axiosInstance.interceptors.response.use(
//   (response) => {
//     if (response.status === 401) {
//       Cookies.remove("token");
//     }
//     if (response.status === 403) {
//       redirect("/dashboard");
//     }

//     return response;
//   },

//   (error) => {
//     let token = Cookies.get("token");

//     if (error.response.status === 401) {
//       Cookies.remove("token");
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
