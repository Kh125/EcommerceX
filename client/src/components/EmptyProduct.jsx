import { Link } from "react-router-dom";

const EmptyProduct = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-6 my-24">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        No Products Available
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        It looks like there are no products available at the moment.
      </p>
      <Link
        to="/products/create"
        className="px-4 py-2 text-white bg-green-400 rounded-md hover:bg-green-600 transition duration-200"
      >
        Add New Product
      </Link>
    </div>
  );
};

export default EmptyProduct;
