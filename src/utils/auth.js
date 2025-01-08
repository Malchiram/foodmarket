import Swal from "sweetalert2";
import { API } from "../config/api";

export async function register(data) {
  try {
    const response = await API.post("register", data);
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

export async function login(data) {
  try {
    const login = await API.post("login", data);
    console.log("Login Success", login?.data);
    if (login && login.status > 200) {
      Swal.fire("Something Wrong!", "Login Failed");
    } else {
      Swal.fire("Good job!", "Login Success");
      return login?.data
    }
  } catch (error) {
    throw new error("Failed Login");
  }
}

