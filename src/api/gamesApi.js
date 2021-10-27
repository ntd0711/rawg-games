import { API_KEY } from "../constants";
import axiosClient from "./axiosClient";

export const gamesApi = {
  getAll(params) {
    return axiosClient.get("/games", {
      params: { ...params, key: API_KEY },
    });
  },

  getById(id) {
    return axiosClient.get(`/games/${id}`, { params: { key: API_KEY } });
  },
};
