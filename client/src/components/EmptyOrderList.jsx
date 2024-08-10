import { Link } from "react-router-dom";

const EmptyOrderList = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-24 p-6">
      <div className="max-w-lg mx-auto text-center bg-white shadow-xl rounded-lg p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          No Orders Found
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          It looks like you don't have any orders yet.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 text-white bg-green-500 hover:bg-green-600 rounded-md text-lg font-semibold transition duration-150"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default EmptyOrderList;
