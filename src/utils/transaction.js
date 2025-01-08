import { API } from "../config/api";

export async function transaction(data) {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    const transaction = await API.post("transaction", data, config);
    console.log("Post Success", transaction);
    return transaction?.data?.data;
  } catch (error) {
    throw new error("transaction error");
  }
}
export async function transactionUser() {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    const transaction = await API.get("transaction-user", config);
    if (transaction && transaction.status === 200) {

      return transaction?.data?.data;
    }
  } catch (error) {
    throw new error("transaction error");
  }
}
export async function transactionPartner() {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    const transaction = await API.get("transaction-partner", config);
    if (transaction && transaction.status === 200) {

      return transaction?.data?.data;
    }
  } catch (error) {
    throw new error("transaction error");
  }
}
