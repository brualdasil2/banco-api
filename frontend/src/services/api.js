import axios from "axios";


const base_api = axios.create({
  baseURL: "http://127.0.0.1:5000/",
});

export const api = {
  get: (url, ...rest) => base_api.get(`${url}?token=${localStorage.getItem("@banco-api/token")}`, ...rest),
  post: (url, ...rest) => base_api.post(`${url}?token=${localStorage.getItem("@banco-api/token")}`, ...rest),
  put: (url, ...rest) => base_api.put(`${url}?token=${localStorage.getItem("@banco-api/token")}`, ...rest),
  delete: (url, ...rest) => base_api.delete(`${url}?token=${localStorage.getItem("@banco-api/token")}`, ...rest)
}