import { API_KEY } from "../constants";
import axiosClient from "./axiosClient";

export const genresApi = {
  getAll(params) {
    return axiosClient.get("/genres", {
      params: { ...params, key: API_KEY },
    });
  },

  getById(id) {
    return axiosClient.get(`/genres/${id}`, { params: { key: API_KEY } });
  },
};
