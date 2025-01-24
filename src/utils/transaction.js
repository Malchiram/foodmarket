import api, { API } from "../config/api";
import { secureLS } from "./auth";

export async function transaction(data) {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
       
      },
    };

    const transaction = await api.post("transaction", data, config);
    console.log("Post Success", transaction);
    return transaction?.data?.data;
  } catch (error) {
    throw new error("transaction error");
  }
}
export async function transactionUser() {
  try {
  

    const transaction = await api.get("transaction-user");
    if (transaction && transaction.status === 200) {

      return transaction?.data?.data;
    }
  } catch (error) {
    throw new error("transaction error");
  }
}
export async function transactionPartner() {
 const token = secureLS.get('authToken')

  try {
    const config = {
      headers: {
        "Authorization"  : `Bearer ${token}` 
      },
    };

    const transaction = await api.get("transaction-partner", config);
    if (transaction && transaction.status === 200) {

      return transaction?.data?.data;
    }
  } catch (error) {
    throw new error("transaction error");
  }
}
