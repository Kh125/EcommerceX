import useAuth from "../hooks/useAuth";
import { axiosAPI } from "./axiosHelper";

export const checkTokenValidity = async () => {
  const { auth, setAuth } = useAuth();
  const controller = new AbortController();

  try {
    const response = await axiosAPI.get("/auth/verifyAccessToken", {
      params: {
        accessToken: auth?.token,
      },
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.log("Error", error.response?.data);
    setAuth(null);
    localStorage.removeItem("accessToken");
  } finally {
    controller.abort("Abort Verifying token.");
  }
};
