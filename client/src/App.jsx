import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Layout from "./components/Layout";
import RequireAuth from "./middleware/requireAuth";
import { axiosAPI } from "./middleware/axiosHelper";
import useAuth from "./hooks/useAuth";
import { useEffect } from "react";
import CreateProduct from "./pages/CreateProduct";
import UpdateProduct from "./pages/UpdateProduct";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import OrderDetails from "./pages/OrderDetails";
import Footer from "./components/Footer";
import OrderList from "./pages/OrderList";

function App() {
  const { auth, setAuth } = useAuth();

  const checkTokenValidity = async () => {
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

  useEffect(() => {
    // const checkValidity = async () => {
    //   try {
    //     const validity = await checkTokenValidity();
    //     console.log("Validity", validity);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // if (auth?.token) {
    //   checkValidity();
    // }
  }, []);

  return (
    <>
      <Router>
        <NavBar />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />

            <Route element={<RequireAuth />}>
              <Route path="products" element={<Products />} />
              <Route path="profile" element={<Profile />} />
              <Route path="cart" element={<Cart />} />
              <Route path="orders" element={<OrderList />} />
              <Route path="orders/:orderId" element={<OrderDetails />} />
              <Route path="products/:id" element={<ProductDetails />} />
              <Route path="products/create" element={<CreateProduct />} />
              <Route path="products/update/:id" element={<UpdateProduct />} />
            </Route>
          </Route>
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
