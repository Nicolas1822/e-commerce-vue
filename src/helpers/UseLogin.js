import axios from "axios";
import { API_URL } from "@/env/url_routes";

export const useLogin = async (email, password) => {
  try {
    const response = await axios.post(
      API_URL.dev.login,
      {
        email: email,
        password: password
      });
    return {
      status: response.status,
      access_token: response.data.token,
      role: response.data.user.role,
      email: response.data.user.email,
    };
  } catch (error) {
    return {
      status: error.status,
    };
  }
}

export const useForgotPassword = async (email) => {
  try {
    const response = await axios.post(
      API_URL.dev.forgotPassword,
      {
        email: email,
      });
    return {
      status: response.status,
      message: response.data.message,
    };
  } catch (error) {
    return {
      status: error.status,
    };
  }
}

export const useResetPassword = async (token, password) => {
  try {
    const response = await axios.post(
      API_URL.dev.resetPassword,
      {
        token: `${token}`,
        newPassword: password
      });
    return {
      status: response.status,
      message: response.data.message,
    };
  } catch (error) {
    return {
      status: error.status,
    };
  }
}
