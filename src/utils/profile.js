import Swal from "sweetalert2";
import api, { API } from "../config/api";
import { secureLS } from "./auth";



export async function editProfile( data) {

  try {
    const token = secureLS.get('authToken')
    const config = {
      headers: {
        "Content-type": "multipart/form-data",
        "Authorization"  : `Bearer ${token}` 
      },
    };
    const response = await api.patch("update-user", data, config);
    if (response && response.status === 200) {
      Swal.fire("Good job!", "Edit Profile Success");
      return response.data
      }
  } catch (error) {
    Swal.fire("Something Wrong!", "Edit Profile Failed");
    throw new Error("Failed to posted data product ");
  }
}

export async function getOrder(isLogin) {
  try {

      const response = await api.get("order-user");
      if (response && response.status > 200) {
        Swal.fire("Something Wrong!", "data Failed");
      } else {
        // Swal.fire("Good job!", "Login Success");
          return response.data.data
      }
   
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

export async function postOrder(data) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
  
    const order = await api.post("order", data, config);
    console.log(order, "ini order")
  } catch (error) {
    throw new error("Failed Login");
  }
}


