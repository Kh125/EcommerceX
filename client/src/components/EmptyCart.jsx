const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <svg
        className="w-24 h-24 mb-4 text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 3h18M3 7h18M3 11h18M3 15h18M3 19h18"
        />
      </svg>
      <h2 className="text-lg font-semibold text-gray-600">
        Your cart is empty
      </h2>
      <p className="text-gray-500 mt-2">
        Add items to your cart to see them here.
      </p>
    </div>
  );
};

export default EmptyCart;
