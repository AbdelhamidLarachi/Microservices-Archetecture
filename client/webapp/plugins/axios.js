import axios from 'axios';
import urlParse from 'url-parse';
import Vue from 'vue';
// import router from '../router';

const isProduction = process.env.NODE_ENV === 'production';

const currentProtocol = isProduction ? 'https' : 'http';

const apiPort = process.env.API_PORT || 8080;

let apiBaseUrl = '/';

if (!isProduction) {
  // Api Url build
  const apiBaseUrlBuilder = urlParse('');
  apiBaseUrlBuilder.set('protocol', currentProtocol);
  apiBaseUrlBuilder.set('hostname', 'localhost');
  apiBaseUrlBuilder.set('pathname', '');
  if (apiPort) {
    apiBaseUrlBuilder.set('port', apiPort);
  }

  apiBaseUrl = apiBaseUrlBuilder.toString();
}

const base = axios.create({
  baseURL: apiBaseUrl
});

// Add a the header authorization with each request
base.interceptors.request.use(
  config => {
    const token = Vue.$storage.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

base.interceptors.response.use(null, error => {
  if (error.response && error.response.status === 401) {
    Vue.$storage.remove('token');
    // router.push('/');
  }
  return Promise.reject(error);
});

Vue.prototype.$http = base;

export default base;


