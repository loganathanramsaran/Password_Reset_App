// axiosConfig.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:4000/api', // Point to your backend server
  withCredentials: true, // optional, if using cookies
});

export default instance;
