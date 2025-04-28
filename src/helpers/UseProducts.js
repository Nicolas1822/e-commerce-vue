import axios from "axios";
import { API_URL } from "@/env/url_routes";

export const getProducts = async () => {
  try {
    const response = await axios.get(
      API_URL.dev.products.getProducts,
    );
    return response.data;
  } catch (error) {
    return error;
  }
}

export const getProductsById = async (id) => {
  try {
    const response = await axios.get(
      API_URL.dev.products.getProductsById + id,
    );
    return response;
  } catch (error) {
    return error;
  }
}

export const createProduct = async (data) => {
  try {
    const response = await axios.post(
      API_URL.dev.products.createProduct,
      data,
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

export const modifyProduct = async (id, data) => {
  try {
    const response = await axios.patch(
      API_URL.dev.products.editProduct + id,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    return response;
  }
  catch (error) {
    return error;
  }
}

export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(
      API_URL.dev.products.deleteProduct + id,
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
