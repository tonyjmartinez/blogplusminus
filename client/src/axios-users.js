import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3090/"
});

instance.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = token ? token : "";
  return config;
});

export default instance;
