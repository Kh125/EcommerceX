import useAuth from "../hooks/useAuth";
import { axiosAPI } from "./axiosHelper";

const useRefresh = () => {
  const { auth, setAuth } = useAuth();

  const refreshToken = async () => {
    try {
      const response = await axiosAPI.get("/auth/refreshToken", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      const token = response.data?.accessToken;
      const user = response.data?.user;
      setAuth({ token, user });
      console.log("Refresh Auth", auth);
      return token;
    } catch (error) {
      console.log("Refresh Error", error);
      return null;
    }
  };

  return refreshToken;
};

export default useRefresh;
