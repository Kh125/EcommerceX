const ProductCheckout = ({ cartItems, onPaymentOrder }) => {
  const calculateTotalAmount = () => {
    return cartItems.reduce((total, { buyCount, price }) => {
      return total + price * buyCount;
    }, 0);
  };

  const totalAmount = calculateTotalAmount();

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg my-10">
      <div className="text-2xl font-semibold mb-10">Checkout</div>
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div key={item._id} className="flex justify-between py-2">
            <span className="font-medium text-gray-700">{item.name}</span>
            <span className="text-gray-500">Qty: {item.buyCount}</span>
            <span className="text-gray-800">
              ${(item.price * item.buyCount).toFixed(2)}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-between items-center border-t pt-4">
        <h2 className="text-xl font-semibold text-gray-800">Total Amount:</h2>
        <span className="text-xl font-bold text-gray-800">${totalAmount}</span>
      </div>
      <div className="mt-10 flex items-center justify-end">
        <button
          onClick={onPaymentOrder}
          type="submit"
          className={`flex items-center justify-center px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md`}
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
          <span>Proceed to Payment</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCheckout;
