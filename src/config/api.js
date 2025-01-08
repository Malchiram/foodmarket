import axios from "axios";

// Create base URL API
export const API = axios.create({
  baseURL: "http://localhost:5000/api/v1/",
});

export const APILOC = axios.create({
  baseURL: "https://nominatim.openstreetmap.org"
})


// Set Authorization Token Header
export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};

