import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useAuthHelpers from "../utils/Validator";
import useAxiosPrivate from "../middleware/usePrivateAxios";
import OrderCard from "../components/OrderCard";
import EmptyOrderList from "../components/EmptyOrderList";
import { HashLoader } from "react-spinners";
import ErrorOrderFetch from "../components/ErrorOrderFetch";

const OrderList = () => {
  const { auth } = useAuth();
  const { isTokenExpired } = useAuthHelpers();
  const axiosPrivateAPI = useAxiosPrivate();
  const [orders, setOrders] = useState(null);
  const [orderLoading, setOrderLoading] = useState(false);

  const fetchOrderList = async () => {
    setOrderLoading(true);

    try {
      const response = await axiosPrivateAPI.get(`/orders/${auth?.user}`);
      setOrders(response?.data.orders);
      console.log("Order History", response?.data);
      setOrderLoading(false);
    } catch (error) {
      setOrderLoading(false);
      console.log("order error", error?.response);
      isTokenExpired(error?.response?.status);
    }
  };

  const handleRefresh = () => {
    fetchOrderList();
  };
  useEffect(() => {
    fetchOrderList();
  }, []);

  return (
    <>
      {orderLoading ? (
        <div className="flex mx-auto h-screen text-center items-center justify-center text-3xl">
          <HashLoader size={30} loading={orderLoading} />
        </div>
      ) : (
        <div className="p-6 bg-gray-50 min-h-screen">
          <div className="max-w-4xl mx-auto bg-white">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              Your Order History
            </h1>
            {orders == null ? (
              <ErrorOrderFetch onRefresh={handleRefresh} />
            ) : orders.length == 0 ? (
              <EmptyOrderList />
            ) : (
              <ul className="divide-y divide-gray-200">
                {orders.map((order) => (
                  <OrderCard key={order._id} order={order} />
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default OrderList;
