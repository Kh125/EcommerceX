import { createContext, useEffect, useState } from "react";
import AuthService from "../services/authService";
import { createToastMessage } from "../utils/ToastMessage";
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    let accessToken = localStorage.getItem("accessToken");
    let user = localStorage.getItem("user");
    return accessToken ? { token: accessToken, user } : null;
  });
  const { authLogout } = AuthService();

  const logout = (isMessageShown = true) => {
    authLogout();
    setAuth(null);

    if (isMessageShown) {
      createToastMessage("Logout successfully", 1);
    }
  };

  useEffect(() => {
    if (auth) {
      localStorage.setItem("accessToken", auth?.token);
      localStorage.setItem("user", auth?.user);
    } else {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
