import Swal from "sweetalert2";
import api, { API } from "../config/api";
import { secureLS } from "./auth";



export async function addProduct(data) {
   const token = secureLS.get('authToken')
  try {
    const config = {
      headers: {
       'Content-Type': 'multipart/form-data',
       "Authorization"  : `Bearer ${token}` 
      },
    };
    const response = await api.post("/product", data, config);
    if (response && response.status > 200) {
        Swal.fire("Something Wrong!", "Add Product Failed");
      } else {
        Swal.fire("Good job!", "Add Product Success");
      }
  } catch (error) {
    Swal.fire("Something Wrong!", "Add Product Failed");
    throw new Error("Failed to posted data product ");
  }
}

export async function Partner() {
  try {
    const response = await api.get("partner");
    if (response?.status === 200) {
      return response?.data?.data;
    }
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

export async function transactionPartner() {
  try {
    const response = await api.get("transaction-partner");
    if (response.status === 200) {
      return response.data.data;
    }
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}
export async function transactionUser() {
  try {
    const response = await api.get("transaction-user");
    if (response.status === 200) {
      return response?.data?.data;
    }
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}
