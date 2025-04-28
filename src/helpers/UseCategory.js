import axios from "axios";
import { API_URL } from "@/env/url_routes";

export const getCategoriesWithProducts = async () => {
  try {
    const response = await axios.get(API_URL.dev.categories.getCategories);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}

export const createCategory = async (data) => {
  try {
    const response = await axios.post(API_URL.dev.categories.createCategories, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
}

export const getCategoryById = async (id) => {
  try {
    const response = await axios.get(API_URL.dev.categories.getCategoryById + id);
    return { name_category: response.data.name };
  } catch (error) {
    return error;
  }
}

export const modifyCategory = async (id, categoryName) => {
  try {
    const response = await axios.patch(
      API_URL.dev.categories.modifyCategory + id,
      {
        name: categoryName
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        }
      }
    );
    return response;
  } catch (error) {
    return error;
  }
}

export const deleteCategory = async (id) => {
  try {
    const response = await axios.delete(API_URL.dev.categories.deleteCategory + id, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      }
    });
    return response;
  } catch (error) {
    return error
  }
}
