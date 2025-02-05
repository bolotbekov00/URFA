import axios from "axios";
import { notify } from "./helpers";

const baseURL = import.meta.env.VITE_API_URL;

const axiosBase = axios.create({
  baseURL: baseURL,
});

axiosBase.interceptors.request.use(
  (config) => {
    const userLanguage = localStorage.getItem("lang");

    if (userLanguage) {
      config.headers["Accept-Language"] = userLanguage;
    }
    const userLocation = localStorage.getItem("location");
    if (userLocation) {
      config.headers["Accept-Location"] = userLocation;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const baseGetRequest = async (url) => {
  try {
    const response = await axiosBase.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const axiosPersonal = axios.create({
  baseURL: `${baseURL}/users`,
});

const usersErrorResponse = (data) => {
  if (data.detail) notify.error(data.detail);
  for (let error in data) {
    const errorMessages = data[error];
    errorMessages.forEach((errorMessage) => {
      notify.error(errorMessage);
    });
  }
};

axiosPersonal.interceptors.request.use(async (config) => {
  if (
    config.url === "/profile/" ||
    config.url === "/logout/" ||
    config.url === "/change_password/"
  ) {
    const token = localStorage.getItem("access");
    config.headers = {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    };
    return config;
  }
  if (config.url === "/refresh/") {
    config.data = { refresh: localStorage.getItem("refresh") };
    return config;
  }
  return config;
});

axiosPersonal.interceptors.response.use(
  (response) => {
    if (response.config.url === "/login/" && response.status === 200) {
      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
      return response;
    }
    if (response.config.url === "/refresh/" && response.status === 200) {
      console.log("Access Token refresh");
      localStorage.setItem("access", response.data.access);
      return response;
    }
    if (response.config.url === "/logout/" && response.status === 205) {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      return response;
    }
    return response;
  },
  async function (error) {
    const errorResponse = error.response;
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      localStorage.getItem("refresh") != null
    ) {
      await axiosPersonal.post("/refresh/");
      return axiosPersonal(originalRequest);
    } else if (
      error?.response?.status === 400 ||
      error?.response?.status === 401
    ) {
      usersErrorResponse(errorResponse.data);
    }
    return Promise.reject(error);
  },
);

export const usersRequester = async (endpoint, data, type) => {
  try {
    if (type === "patch") {
      const response = await axiosPersonal.patch(`${endpoint}`, data);
      return response;
    }
    if (!data) {
      const response = await axiosPersonal.get(`${endpoint}`);
      return response;
    }
    if (data && type !== "patch") {
      const response = await axiosPersonal.post(`${endpoint}`, data);
      return response;
    }
  } catch (error) {
    console.log("error");
  }
};

export const searchRequester = async (requestData) => {
  try {
    const response = await axiosBase.post("/servises/search/", requestData);
    return response.data;
  } catch (error) {
    console.error("Error performing search:", error);
    throw error;
  }
};
