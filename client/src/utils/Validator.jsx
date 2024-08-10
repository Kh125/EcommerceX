import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { createToastMessage } from "./ToastMessage";

const useAuthHelpers = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const isTokenExpired = (status) => {
    if (status === 403) {
      createToastMessage(
        "User not authenticated or authentication timeout. Please login again!",
        4
      );
      logout(false);
      navigate("/login");
    }
  };

  return { isTokenExpired };
};

export default useAuthHelpers;
