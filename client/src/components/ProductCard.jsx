import { Link } from "react-router-dom";
import {
  AiFillDollarCircle,
  AiOutlineArrowRight,
  AiOutlineShoppingCart,
} from "react-icons/ai";

const ProductCard = ({ product }) => {
  return (
    <div
      key={product._id}
      className="bg-white shadow-lg rounded-lg overflow-hidden"
    >
      {/* "https://placehold.co/300x200/d1d4ff/352cb5.png" */}
      <img
        src={product.image || "../images/product.jpg"}
        alt={product.name}
        className="w-full h-32 object-cover"
      />
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">
            {product.name}
          </h2>
          <p className="flex items-center text-gray-600 my-2">
            <AiFillDollarCircle className="mr-1 mt-1 text-xl text-orange-400" />
            {product.price}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <Link
            to={`/products/${product._id}`}
            className="flex items-center py-2 text-green-600 underline hover:text-green-400 transition duration-100 text-sm"
          >
            View Details
            <AiOutlineArrowRight className="mt-1 ml-1 text-sm" />
          </Link>
          {product.isAddedToCart && product.remainingStock > 0 && (
            <div className="flex items-center justify-center text-slate-400">
              <AiOutlineShoppingCart className="mr-1" />
              Added
            </div>
          )}
          {product.remainingStock <= 0 && (
            <div className="text-xs flex items-center justify-center text-red-300 line-through">
              Out of Stock
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
