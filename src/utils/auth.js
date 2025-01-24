import Swal from "sweetalert2";
import api, { API, setAuthToken } from "../config/api";
import SecureLS from "secure-ls";
import { decodeToken } from "react-jwt";
export const secureLS = new SecureLS({ encodingType: 'aes', isCompression: true  });

export async function register(data) {
  try {
    const response = await api.post("register", data);
    console.log("Register SUCCESS", response);
    if (response && response.status > 200) {
      Swal.fire("Something Wrong!", "Register Failed");
    } else {
      Swal.fire("Good job!", "Register Success");
    }
  } catch (error) {
    Swal.fire("Something Wrong!", "Register Failed");
    throw new error("Failed Register");
  }
}


// actions/authActions.js
export const loginUser = (datas) => {
  return async (dispatch) => {
    try {
      // Melakukan POST request untuk login
      const response = await api.post("login", datas)
      
      if (response.status !== 200) {
        Swal.fire("Something Wrong!", "Login Failed");
      } else {
        Swal.fire("Good job!", "Login Success");
        const data = await response.data;
        secureLS.set('authToken', data.token); 
        const user =  decodeToken(data.token);
        console.log(user,'ini decoded');
        
        await dispatch({
          type: 'LOGIN_SUCCESS',
          payload: user,
        });
        
        // Redirect berdasarkan role
      return data
      }
     
    } catch (error) {
      // Dispatch action untuk menangani error
     Swal.fire({
           icon: "error",
           title: "Oops...",
           text: "You are not registered!",
         });
console.log(error)
      // Anda juga bisa menampilkan error menggunakan alert atau Swal
    }
  };
};

export const logoutUser = () => (dispatch) => {
  dispatch({ type: 'LOGOUT_USER' });
};
