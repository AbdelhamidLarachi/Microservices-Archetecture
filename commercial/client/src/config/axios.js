import axios from "axios"
export const baseURL = "http://192.168.0.110:9000";
const user = JSON.parse(localStorage.getItem('user'));

export const api = axios.create({
  baseURL: `${baseURL}/commercial/`,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    'Authorization': user ? `Bearer ${user.token}` : null,
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
  }
});