import { useState } from "react";
import { axiosAPI } from "../middleware/axiosHelper";
import useAuth from "../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { createToastMessage } from "../utils/ToastMessage";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState();
  const { setAuth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (e) => {
    e.preventDefault();

    const controller = new AbortController();

    try {
      const response = await axiosAPI.post(
        "/auth/login",
        {
          username,
          password,
        },
        {
          signal: controller.signal,
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const token = response?.data?.accessToken;
      const user = response?.data?.user;
      setAuth({ token, user });
      setErrors(null);
      navigate(from, { replace: true });
      createToastMessage("Login Successfully", 1);
    } catch (err) {
      if (err.response) {
        const { data } = err.response;
        setErrors(data.errors);
      }
    }

    return () => {
      controller.abort("Cancel Login Transaction");
    };
  };

  return (
    <div className="relative flex min-h-screen text-gray-800 antialiased flex-col justify-center overflow-hidden bg-gray-50">
      <div className="relative py-3 sm:w-96 mx-auto text-center">
        <span className="text-2xl font-light ">Login to your account</span>
        <form onSubmit={handleLogin}>
          <div className="mt-4 bg-white shadow-md rounded-lg text-left">
            <div className="h-2 bg-green-400 rounded-t-md"></div>
            <div className="px-8 py-6 ">
              <label className="block font-semibold">Username</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                name="username"
                placeholder="Username"
                className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"
              />
              {errors && errors.username && (
                <span className="text-red-500 text-sm">{errors.username}</span>
              )}

              <label className="block mt-3 font-semibold">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                placeholder="Password"
                className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"
              />
              {errors && errors.password && (
                <span className="text-red-500 text-sm">{errors.password}</span>
              )}

              <div className="flex justify-between items-baseline">
                <button
                  type="submit"
                  className="mt-4 bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 "
                >
                  Login
                </button>
                <a href="#" className="text-sm hover:underline">
                  Forgot password?
                </a>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
