import { useState } from "react";
import { axiosAPI } from "../middleware/axiosHelper";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const { setAuth } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const controller = new AbortController();

    try {
      const response = await axiosAPI.post(
        "/auth/signup",
        {
          username,
          email,
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

      console.log(response.data);
      const token = response?.data?.accessToken;
      const user = response?.data?.user;

      setAuth({ token, user });
      setErrors(null);

      navigate("/");
    } catch (err) {
      if (err.response) {
        const { data } = err.response;
        setErrors(data.errors);
      }
    }

    return () => {
      controller.abort("Abort Signup Operation");
    };
  };

  return (
    <div className="relative flex min-h-screen text-gray-800 antialiased flex-col justify-center overflow-hidden bg-gray-50 pb-6 sm:pb-12">
      <form onSubmit={handleSubmit}>
        <div className="relative py-3 sm:w-96 mx-auto text-center">
          <p className="text-2xl font-light ">Sign Up</p>
          <div className="mt-4 bg-white shadow-md rounded-lg text-left">
            <div className="h-2 bg-green-400 rounded-t-md"></div>
            <div className="px-8 py-6 ">
              <label className="block font-semibold"> Username</label>
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

              <label className="block font-semibold"> Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                name="email"
                placeholder="Email"
                className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"
              />
              {errors && errors.email && (
                <span className="text-red-500 text-sm">{errors.email}</span>
              )}

              <label className="block mt-3 font-semibold"> Password</label>
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

              <label className="block mt-3 font-semibold">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Password"
                className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"
              />
              <div className="flex justify-between items-baseline">
                <button
                  type="submit"
                  className="mt-4 bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 "
                >
                  Submit
                </button>
                <a href="#" className="text-sm hover:underline">
                  Already have an account?
                </a>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
