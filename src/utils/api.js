import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const auth = {
  login: async (body) => {
    return await axios.post(`${BASE_URL}/auth/login`, body);
  },
  register: async (body) => {
    return await axios.post(`${BASE_URL}/auth/register`, body);
  },
};
