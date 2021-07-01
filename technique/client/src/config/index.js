import axios from "axios"
const user = JSON.parse(localStorage.getItem('user'));

export const http = axios.create({
  baseURL: 'http://192.168.0.110:9000/',
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    'Authorization': user ? `Bearer ${user.token}` : null,
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Method": "DELETE, POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
  }
});