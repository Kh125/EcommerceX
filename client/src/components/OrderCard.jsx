import { Link } from "react-router-dom";

const OrderCard = ({ order }) => {
  return (
    <div className="p-4 border border-gray-200 rounded-lg shadow-md mb-4">
      <div className="flex justify-between items-center mb-2 pb-2 border-b border-gray-400">
        <h2 className="text-lg font-semibold text-gray-800">
          Order #{order._id}
        </h2>
        <span
          className={`text-sm font-medium ${
            order.status === "Delivered"
              ? "text-green-600"
              : order.status === "Shipped"
              ? "text-yellow-600"
              : "text-red-600"
          }`}
        >
          {order.status}
        </span>
      </div>
      <p className="text-gray-600 mb-2">
        Order Date: {new Date(order.orderDate).toLocaleDateString()}
      </p>
      <p className="text-gray-600 mb-2">
        Total Amount: ${order.totalAmount.toFixed(2)}
      </p>
      <div className="border-t border-dashed border-gray-400 block"></div>
      <Link
        to={`/orders/${order._id}`}
        className="text-blue-400 text-sm underline hover:text-blue-600 transition duration-150"
      >
        View Details
      </Link>
    </div>
  );
};

export default OrderCard;
