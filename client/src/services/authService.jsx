const AuthService = () => {
  const authLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
  };

  return { authLogout };
};

export default AuthService;
