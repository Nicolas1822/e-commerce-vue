import axios from "axios";
import { API_URL } from "@/env/url_routes";

export const createOrder = async () => {
  try {
    const response = await axios.post(
      API_URL.prod.orders.createOrder,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return error;
  }
}

export const addItemToOrder = async (orderId, productId, amount) => {
  try {
    const response = await axios.post(
      API_URL.prod.orders.addItemToOrder,
      {
        orderId: orderId,
        productId: productId,
        amount: amount,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    return response;
  } catch (error) {
    return error;
  }
}

export const myOrders = async () => {
  try {
    const response = await axios.get(API_URL.prod.orders.showMyOrders, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
}

export const deleteOrder = async (orderId) => {
  try {
    const response = await axios.delete(API_URL.prod.orders.deleteOrder + orderId, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
}
