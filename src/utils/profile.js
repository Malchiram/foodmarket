import Swal from "sweetalert2";
import { API } from "../config/api";



export async function editProfile( data) {

  try {
    
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    const response = await API.patch("update-user", data, config);
    if (response && response.status === 200) {
     const alert = Swal.fire("Good job!", "Edit Profile Success");
      if(alert && response.data.data.role === "As Partner") {
        setTimeout(() => {
          window.location.href = "/ProfilePartner"
        },1000)
      } else if (response.data.data.role === "As User"){
        setTimeout(() => {
          window.location.href = "/Profile"
        },1000)
      }
      }
  } catch (error) {
    Swal.fire("Something Wrong!", "Edit Profile Failed");
    throw new Error("Failed to posted data product ");
  }
}

export async function getOrder() {
  try {
    const response = await API.get("order-user");
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
  
    const order = await API.post("order", data, config);
    console.log(order, "ini order")
  } catch (error) {
    throw new error("Failed Login");
  }
}


