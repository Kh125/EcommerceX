import React, { useState } from "react";
import useCartContext from "../hooks/useCartContext";
import useAxiosPrivate from "../middleware/usePrivateAxios";
import useAuth from "../hooks/useAuth";
import EmptyCart from "../components/EmptyCart";
import { createToastMessage } from "../utils/ToastMessage";
import ProductCheckout from "../components/ProductCheckout";
import useAuthHelpers from "../utils/Validator";
import OrderPayment from "../components/OrderPayment";
import CartItem from "../components/CartItem";

const Cart = () => {
  const { cartItems, setCartItems } = useCartContext();
  const { isTokenExpired } = useAuthHelpers();
  const isDisabled = cartItems.length === 0;
  const { auth } = useAuth();
  const axiosPrivateAPI = useAxiosPrivate();
  const [toCheckout, setToCheckout] = useState(false);
  const [toPayment, setToPayment] = useState(false);
  const [purchaseLoading, setPurchaseLoading] = useState(false);

  const handleProceedPayment = () => {
    console.log("toPy", toPayment);
    setToCheckout(false);
    setToPayment(true);
  };

  const handleProductOrder = async (e) => {
    e.preventDefault();
    setPurchaseLoading(true);
    // console.log("Purchase Ordered", cartItems);
    // console.log("AUTH", auth);
    try {
      const productList = generateOrderedProductList();
      const totalAmount = calculateTotalAmount();
      const userAddress = await fetchUserAddress();

      const newOrder = {
        userId: auth?.user,
        orderDate: new Date(),
        status: "Pending",
        totalAmount,
        products: productList,
        shippingAddress: userAddress,
      };

      const response = await axiosPrivateAPI.post("/orders", {
        order: newOrder,
      });

      setToCheckout(false);
      setToPayment(false);
      setPurchaseLoading(false);
      createToastMessage("Order is successfully created", 1);
      setCartItems([]);
      localStorage.removeItem("cartItems");
      // console.log("User Address", userAddress);
    } catch (error) {
      console.log(error?.response);
      setPurchaseLoading(false);
      createToastMessage("Failed to create order!", 4);
      isTokenExpired(error?.response?.status);
    }
  };

  const fetchUserAddress = async () => {
    try {
      const addressResponse = await axiosPrivateAPI.get(
        `/auth/user-address/${auth?.user}`
      );

      // console.log("Address Response", addressResponse.data);
      return addressResponse.data?.address;
    } catch (error) {
      console.log(error?.response);
    }
  };

  const generateOrderedProductList = () => {
    return cartItems.map(({ _id, name, buyCount, price }) => ({
      productId: _id,
      name,
      quantity: buyCount,
      price,
    }));
  };

  const calculateTotalAmount = () => {
    return cartItems.reduce((total, { buyCount, price }) => {
      return total + price * buyCount;
    }, 0);
  };

  const handleStockChange = (productId, newStock) => {
    setCartItems((items) => {
      const updatedItems = items.map((item) =>
        item._id === productId ? { ...item, buyCount: newStock } : item
      );

      localStorage.setItem("cartItems", JSON.stringify(updatedItems));

      return updatedItems;
    });
  };

  const handleItemRemove = (productId) => {
    let updatedproducts = cartItems.filter((q) => q._id !== productId);
    setCartItems(updatedproducts);
    localStorage.setItem("cartItems", JSON.stringify(updatedproducts));
  };

  // console.log("Cart Items", cartItems);
  // console.log("auth", auth);

  return (
    <>
      {toCheckout ? (
        <ProductCheckout
          cartItems={cartItems}
          onPaymentOrder={handleProceedPayment}
        />
      ) : toPayment ? (
        <OrderPayment
          isLoading={purchaseLoading}
          onSubmit={handleProductOrder}
        />
      ) : (
        <form
          onSubmit={() => setToCheckout(true)}
          className="p-6 bg-grp-6 bg-gray-50 min-h-screen"
        >
          <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b-4 border-green-500 pb-2">
              Cart Items
            </h1>
            {cartItems.length === 0 ? (
              <EmptyCart />
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <CartItem
                    key={item._id}
                    product={item}
                    onItemCountChange={handleStockChange}
                    onItemRemove={handleItemRemove}
                  />
                ))}
              </div>
            )}
            <div className="mt-10 flex items-center justify-end">
              <button
                disabled={isDisabled}
                type="submit"
                className={`flex items-center justify-center px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md ${
                  isDisabled
                    ? "cursor-not-allowed bg-blue-400 opacity-50"
                    : "hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out"
                }`}
              >
                <svg
                  className="w-5 h-5 mr-2 -ml-1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Proceed to Checkout</span>
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default Cart;
