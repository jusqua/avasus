import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://avasus-json-db.onrender.com/',
});

export default instance;
