import { API_KEY } from "../constants";
import axiosClient from "./axiosClient";

export const gamesApi = {
  getAll(params) {
    return axiosClient.get("/games", {
      params: { ...params, key: API_KEY },
    });
  },

  getById(slug) {
    return axiosClient.get(`/games/${slug}`, { params: { key: API_KEY } });
  },

  getScreenShots(slug) {
    return axiosClient.get(`/games/${slug}/screenshots`, {
      params: { key: API_KEY },
    });
  },
};
