import axios, { AxiosRequestConfig } from "axios";

export const axiosLoginInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

export const LoginAxios = async (endpoint, body) =>
  await axiosLoginInstance.post(endpoint, body);

export const findAxios = async (endpoint) =>
  await axiosLoginInstance.get(endpoint);

export const getAxios = async (endpoint) =>
  await axiosLoginInstance.get(endpoint, {
    headers: {
      Authorization: window.sessionStorage.getItem("accessToken"),
    },
  });

export const deleteAxios = async (endpoint) =>
  await axiosLoginInstance.delete(endpoint, {
    headers: {
      Authorization: window.sessionStorage.getItem("accessToken"),
    },
  });

export const postAxios = async (endpoint, body) =>
  await axiosLoginInstance.post(endpoint, body, {
    headers: {
      Authorization: window.sessionStorage.getItem("accessToken"),
    },
  });

export const patchAxios = async (endpoint, body) =>
  await axiosLoginInstance.patch(endpoint, body, {
    headers: {
      Authorization: window.sessionStorage.getItem("accessToken"),
    },
  });

export const bikeReturnAxios = async (endpoint, photo1, array) =>
  await axiosLoginInstance.post(endpoint, photo1, {
    headers: {
      Authorization: window.sessionStorage.getItem("accessToken"),
    },
  });

const refreshAuthToken = async () => {
  const refreshToken = {
    refreshToken: window.localStorage.getItem("refreshToken"),
  };
  if (!refreshToken.refreshToken) {
    throw new Error("No refresh token available");
  }

  // 기존 axios 요청에서 Authorization 헤더를 제거합니다.
  const response = await axios.post(
    `${process.env.REACT_APP_SERVER_URL}admin/auth/refresh`,
    refreshToken,
    {
      headers: { Authorization: undefined },
    }
  );

  const newAccessToken = response.data.body.accessToken;
  window.sessionStorage.setItem("accessToken", newAccessToken);
  return newAccessToken;
};

axiosLoginInstance.interceptors.request.use(
  async (config) => {
    const accessToken = window.sessionStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosLoginInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await refreshAuthToken();
        axios.defaults.headers.common["Authorization"] = newAccessToken;
        originalRequest.headers.Authorization = newAccessToken;
        return axiosLoginInstance(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
