import axios from "axios";

const API = axios.create({
  baseURL:"https://pathforge-4-iwk7.onrender.com",
});

export default API;