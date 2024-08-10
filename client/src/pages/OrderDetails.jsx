import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAuthHelpers from "../utils/Validator";
import useAxiosPrivate from "../middleware/usePrivateAxios";
import EmptyOrder from "../components/EmptyOrder";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { AiOutlineFilePdf } from "react-icons/ai";
import { HashLoader } from "react-spinners";

const statusColors = {
  Pending: "bg-yellow-200 text-yellow-800",
  Shipped: "bg-blue-200 text-blue-800",
  Delivered: "bg-green-200 text-green-800",
};

const paymentStatusColors = {
  Paid: "bg-green-200 text-green-800",
  Unpaid: "bg-red-200 text-red-800",
};

const OrderDetails = () => {
  const { orderId } = useParams();
  const { auth } = useAuth();
  const [order, setOrder] = useState(null);
  const { isTokenExpired } = useAuthHelpers();
  const axiosPrivateAPI = useAxiosPrivate();
  const [isLoading, setIsLoading] = useState(false);

  const generatePDF = async () => {
    const excludeButton = document.getElementById("exclude-from-pdf");
    excludeButton.style.display = "none";

    const element = document.getElementById("order-details-content");

    if (!element) {
      console.error("Order details content not found");
      return;
    }

    // Capture the content as a canvas
    const canvas = await html2canvas(element, {
      scale: 1.8,
    });
    const imgData = canvas.toDataURL("image/png");

    // Create a new PDF document
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [canvas.width, canvas.height],
    });

    // Add the image to the PDF
    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);

    excludeButton.style.display = "";
    // Save the PDF
    pdf.save(`Order_Details_${orderId}.pdf`);
  };

  useEffect(() => {
    const fetchOrderInformation = async () => {
      setIsLoading(true);
      try {
        const response = await axiosPrivateAPI.get(
          `/orders/${auth?.user}/${orderId}`
        );
        console.log("Order information", response?.data);
        setOrder(response?.data?.order);
        setIsLoading(false);
      } catch (error) {
        console.log("Error fetching order", error?.response);
        setIsLoading(false);
        isTokenExpired(error?.response?.status);
      }
    };

    fetchOrderInformation();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex mx-auto h-screen text-center items-center justify-center text-3xl">
          <HashLoader size={30} loading={isLoading} />
        </div>
      ) : order == null ? (
        <EmptyOrder />
      ) : (
        <div className="p-6 bg-gray-50 min-h-screen">
          <div
            className="relative max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8"
            id="order-details-content"
          >
            <div className="absolute bottom-12 right-8">
              <button
                id="exclude-from-pdf"
                onClick={generatePDF}
                className="flex items-center rounded-md px-6 py-2 text-white bg-orange-500 hover:bg-orange-600 traisition duration-150"
              >
                <AiOutlineFilePdf className="mr-1 text-xl" />
                Save Invoice as PDF
              </button>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-6">
                Order Details
              </h1>
              <div className="mb-8 border-b border-gray-200 pb-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-medium text-gray-800 mb-2">
                    Order #{order._id}
                  </h2>
                  <span
                    className={`inline-block px-2 py-1 text-sm font-semibold rounded-full ${
                      statusColors[order.status]
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Order Date:</span>{" "}
                  {new Date(order.orderDate).toLocaleDateString()}
                </p>
                <div className="border-t border-gray-200 block mb-8"></div>
                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-4">
                    Payment
                  </h3>
                  <p className="flex items-center text-gray-600 mb-2 space-x-2">
                    <span className="font-medium">Type:</span>{" "}
                    <span className="font-semibold text-sm">
                      {order.paymentType === 0
                        ? "Cash On Delivery"
                        : order.paymentType === 1
                        ? "Mobile Banking"
                        : order.paymentType === 2
                        ? "Credit Card"
                        : "PayPal"}
                    </span>
                  </p>
                  <p className="text-gray-600 mb-2">
                    <span className="font-medium">Status:</span>
                    <span
                      className={`ml-2 inline-block px-3 py-1 text-sm font-semibold rounded-full ${
                        order.paymentDone
                          ? paymentStatusColors.Paid
                          : paymentStatusColors.Unpaid
                      }`}
                    >
                      {order.paymentDone ? "Paid" : "Unpaid"}
                    </span>
                  </p>
                  {!order.paymentDone && order.paymentType == 0 && (
                    <span className="bg-slate-200 border-gray-600 px-4 py-2 text-yellow-600 text-xs shadow-md rounded-md">
                      You need to paid for the order when the order arrive.
                    </span>
                  )}
                </div>
              </div>
              <div className="mb-8">
                <h3 className="text-xl font-medium text-gray-800 mb-4">
                  Products
                </h3>
                <ul className="divide-y divide-gray-200 mb-6">
                  {order.products.map((product) => (
                    <li
                      key={product.productId}
                      className="flex justify-between items-center py-4 text-gray-600"
                    >
                      <span className="font-medium">{product.name}</span>
                      <span>
                        Qty: {product.quantity} - ${product.price.toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="flex items-center justify-between text-lg font-medium border-t border-dashed border-gray-400 text-gray-800 pt-10">
                  <span className="font-semibold">Total Amount:</span> $
                  {order.totalAmount.toFixed(2)}
                </p>
              </div>
              {order.shippingAddress && (
                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-4">
                    Shipping Address
                  </h3>
                  <p className="text-gray-600">
                    {order.shippingAddress.street}, {order.shippingAddress.city}
                    , {order.shippingAddress.state},{" "}
                    {order.shippingAddress.postalCode},{" "}
                    {order.shippingAddress.country}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderDetails;
