import Swal from "sweetalert2";
import api, { API } from "../config/api";

export async function getProductId(id) {
    try {
        const response = await api.get(`product-partner/${id}`)
        return response.data?.data;
        } catch (error) {
          throw new Error('Failed to fetch data');
    }
}

export async function deleteAllorder() {
    try {
    
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    const response = await api.delete("delete-order", config);
    if (response && response.status === 200) {
      console.log(response)
      }
  } catch (error) {
    Swal.fire("Something Wrong!", "DELETE FAILED");
    throw new Error("Failed to delete data order ");
  }
}

export async function deleteorder(id) {
    try {
    
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    const response = await api.delete(`order/${id}`, config);
    if (response && response.status === 200) {
        Swal.fire("Something good!", "DELETE succes");
      }
  } catch (error) {
    Swal.fire("Something Wrong!", "DELETE FAILED");
    throw new Error("Failed to delete data order ");
  }
}

