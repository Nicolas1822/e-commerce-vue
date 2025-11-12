import axios from "axios";
import { API_URL } from "@/env/url_routes";

export const useRegister = async (name, lastName, phone, email, password) => {
  try {
    const response = await axios.post(
      API_URL.dev.register,
      {
        name: name,
        lastName: lastName,
        phone: phone,
        user: {
          email: email,
          password: password
        }
      });
    return {
      status: response.status,
      access_token: response.data.access_token,
      role: response.data.customer.user.role,
      email: response.data.customer.user.email,
    };
  } catch (error) {
    return { status: error.status, message: error.response.data.errors[0].message };
  }
}
