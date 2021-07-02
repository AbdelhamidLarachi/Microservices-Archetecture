import axios from "axios"
export const baseURL = "http://192.168.0.110:9000";
const user = JSON.parse(localStorage.getItem('user'));

export const restaurateur_id = "60d4c95adb3781484841a281";

// AMI HMED: 60d4c95adb3781484841a281
// JIA YONGIAN:  60d4de0dcbd2522c9072c9b7


export const http = axios.create({
  baseURL: `${baseURL}/devtiers/`,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    'Authorization': user ? `Bearer ${user.token}` : null,
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
  }
});