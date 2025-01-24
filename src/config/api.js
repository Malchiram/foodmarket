import axios from "axios";
import { logoutUser, secureLS } from "../utils/auth";
import { store } from "../utils/store/store";
import storageSession from 'redux-persist/lib/storage/session'

// Create base URL API
export const APILOC = axios.create({
  baseURL: "https://nominatim.openstreetmap.org"
})

const api = () => {
  const defaultOptions = {
    baseURL: "https://store2.waysfood.store/api/v1/",
    headers: {
      // 'Content-Type': 'application/json',
    },
  }
  const instance = axios.create(defaultOptions)

  instance.interceptors.request.use((config) => {
    const rootUrl = window.location.origin
    const token = secureLS.get('authToken')
    if (token) {
      const headers = { ...config.headers } 
      headers.Authorization = token ? `Bearer ${token}` : ''
    
    }
    return config
  })
 
  return instance
};



export default api()

// Set Authorization Token Header
// export const setAuthToken = (token) => {
//   if (token ) {
//     API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//   } else {
//     delete API.defaults.headers.common["Authorization"];
//   }
// };

