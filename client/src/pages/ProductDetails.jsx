import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useCartContext from "../hooks/useCartContext";
import useAxiosPrivate from "../middleware/usePrivateAxios";
import {
  AiOutlineDollarCircle,
  AiOutlineRollback,
  AiOutlineShoppingCart,
} from "react-icons/ai";

const ProductDetails = () => {
  const axiosPrivateAPI = useAxiosPrivate();
  const { cartItems, setCartItems } = useCartContext();
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const addProductToCart = () => {
    product.isAddedToCart = true;
    setCartItems((prevState) => [...prevState, product]);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    setIsAddedToCart(true);
  };

  const removeProductFromCart = () => {
    product.isAddedToCart = false;
    let updatedproducts = cartItems.filter((q) => q._id !== product._id);
    setCartItems(updatedproducts);
    localStorage.setItem("cartItems", JSON.stringify(updatedproducts));
    setIsAddedToCart(false);
  };

  // console.log("Cart Items", cartItems);

  useEffect(() => {
    const fetchProductInfo = async () => {
      try {
        const response = await axiosPrivateAPI.get(`/products/${id}`);

        setProduct(response.data?.product);

        let productData = response?.data?.product;

        const product = cartItems.find((p) => p._id == productData._id);

        if (product) {
          setIsAddedToCart(true);
        } else {
          setIsAddedToCart(false);
        }
      } catch (error) {
        console.log("Response", error?.response);
      }
    };

    fetchProductInfo();
  }, []);

  return (
    <>
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Product Details
        </h1>
        <div className="flex flex-col md:flex-row md:items-center">
          {/* Image Section */}
          <div className="md:w-1/3 mb-6 md:mb-0">
            {/* "https://i.ibb.co/QMdWfzX/component-image-one.png" */}
            <img
              src={product.image || "../images/product.jpg"} // Replace with actual image URL
              alt={product.name}
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
          </div>
          {/* Details Section */}
          <div className="md:w-2/3 md:pl-8">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-4 text-gray-600">Name</td>
                  <td className="py-2 px-4 text-gray-800">{product.name}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-4 text-gray-600">Description</td>
                  <td className="py-2 px-4 text-gray-800">
                    {product.description}
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-4 text-gray-600">Price</td>
                  <td className="flex items-center py-2 px-4 text-gray-800">
                    <AiOutlineDollarCircle className="mr-1 text-orange-400 text-xl" />
                    {product.price}
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-4 text-gray-600">Stock</td>
                  <td className="py-2 px-4 text-gray-800">
                    {product.remainingStock > 0 ? (
                      product.remainingStock
                    ) : (
                      <span className="text-red-400">Out of Stock</span>
                    )}
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-4 text-gray-600">Colors</td>
                  <td className="py-2 px-4 text-gray-800">{product.color}</td>
                </tr>
              </tbody>
            </table>
            <div className="mt-6 flex space-x-4">
              <Link
                to="/products"
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
              >
                <AiOutlineRollback className="text-xl mr-1" />
                Go Back
              </Link>
              <Link
                to={`/products/update/${id}`}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Update Product
              </Link>

              {isAddedToCart && product.remainingStock > 0 && (
                <button
                  onClick={removeProductFromCart}
                  className="flex items-center px-4 py-2 bg-red-400 text-white rounded-lg hover:bg-red-600 transition duration-300"
                >
                  <AiOutlineShoppingCart className="mr-1 text-xl" />
                  Remove from Cart
                </button>
              )}
              {!isAddedToCart && product.remainingStock > 0 && (
                <button
                  onClick={addProductToCart}
                  className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
                >
                  <AiOutlineShoppingCart className="mr-1 text-xl" />
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
