import axios from "axios"
export const baseURL = "http://192.168.0.110:9000";
const user = JSON.parse(localStorage.getItem('user'));
console.log(user);
export const client_id = "60d8da8b6dc4d448e467f23e";


export const api = axios.create({
  baseURL: `${baseURL}/client/`,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    'Authorization': user ? `Bearer ${user.token}` : null,
    "Access-Control-Allow-Origin": "*",
  }
});