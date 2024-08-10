import React, { useState } from "react";

const OrderPayment = ({ onSubmit, isLoading }) => {
  const [paymentType, setPaymentType] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [showInstantPaymentMethods, setShowInstantPaymentMethods] =
    useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");

  const handlePaymentTypeChange = (event) => {
    const selectedPaymentType = event.target.value;
    setPaymentType(selectedPaymentType);

    setShowInstantPaymentMethods(selectedPaymentType === "Instant Payment");
    setIsDisabled(selectedPaymentType !== "Cash on Delivery");
  };

  const handlePaymentMethodChange = (event) => {
    const selectedPaymentMethod = event.target.value;
    setPaymentMethod(selectedPaymentMethod);
    setIsDisabled(!selectedPaymentMethod);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "accountNumber") {
      setAccountNumber(value);
    } else if (name === "accountName") {
      setAccountName(value);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg my-10"
    >
      <div className="text-2xl font-semibold mb-6">Payment Information</div>
      <div className="space-y-6">
        <div className="mb-4">
          <label htmlFor="paymentType" className="block text-gray-700 mb-2">
            Payment Type
          </label>
          <select
            id="paymentType"
            value={paymentType}
            onChange={handlePaymentTypeChange}
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Payment Type</option>
            <option value="Cash on Delivery">Cash on Delivery</option>
            <option value="Instant Payment">Instant Payment</option>
          </select>
        </div>

        {showInstantPaymentMethods && (
          <div className="mb-4">
            <label
              htmlFor="instantPaymentMethod"
              className="block text-gray-700 mb-2"
            >
              Instant Payment Method
            </label>
            <select
              id="instantPaymentMethod"
              onChange={handlePaymentMethodChange}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Payment Method</option>
              <option value="wavepay">Wavepay</option>
              <option value="kpay">KPay</option>
              <option value="ayapay">Ayapay</option>
              {/* Add more options here if needed */}
            </select>
          </div>
        )}

        {showInstantPaymentMethods && paymentMethod && (
          <>
            <div className="my-10 p-4 border border-gray-200 border-double shadow-sm rounded-md bg-slate-50">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Payment Information
              </h3>
              <p className="text-gray-600 font-semibold">
                Account Number:{" "}
                <span className="font-medium">2066 4139 3332 8888</span>
              </p>
              <p className="text-gray-600 font-semibold">
                Account Name: <span className="font-medium">Andy Cole</span>
              </p>
            </div>
            <div className="space-y-4">
              <div className="mb-4">
                <label
                  htmlFor="accountNumber"
                  className="block text-gray-700 mb-2"
                >
                  Account Number
                </label>
                <input
                  id="accountNumber"
                  name="accountNumber"
                  type="text"
                  value={accountNumber}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your account number"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="accountName"
                  className="block text-gray-700 mb-2"
                >
                  Account Name
                </label>
                <input
                  id="accountName"
                  name="accountName"
                  type="text"
                  value={accountName}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your account name"
                  required
                />
              </div>
            </div>
          </>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading || isDisabled}
            className={`flex items-center px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md ${
              isLoading || isDisabled
                ? "cursor-not-allowed bg-blue-400 opacity-50"
                : "hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out"
            }`}
          >
            {isLoading ? (
              <>
                <svg
                  className="w-5 h-5 mr-2 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6l4 2"
                  />
                </svg>
                <span>Processing...</span>
              </>
            ) : (
              <span>Submit</span>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default OrderPayment;
