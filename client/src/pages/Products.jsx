import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../middleware/usePrivateAxios";
import useAuthHelpers from "../utils/Validator";
import { HashLoader } from "react-spinners";
import { createToastMessage } from "../utils/ToastMessage";
import ErrorProductFetch from "../components/ErrorProductFetch";
import EmptyProduct from "../components/EmptyProduct";
import useCartContext from "../hooks/useCartContext";
import { AiOutlinePlusSquare } from "react-icons/ai";

const Products = () => {
  const { setAuth } = useAuth();
  const [productList, setProductList] = useState([]);
  const axiosPrivateAPI = useAxiosPrivate();
  const { isTokenExpired } = useAuthHelpers();
  const [isLoading, setIsLoading] = useState(false);
  const [errorLoading, setErrorLoading] = useState(false);
  const { cartItems } = useCartContext();

  const fetchProductDataList = async () => {
    setIsLoading(true);
    try {
      const response = await axiosPrivateAPI.get("/products");
      // console.log(response.data?.products);
      let products = response.data?.products;

      if (products && cartItems) {
        const cartItemIdList = cartItems.map((item) => item._id);

        var updatedProducts = products.map((product) => ({
          ...product,
          isAddedToCart: cartItemIdList.includes(product._id),
        }));
      }

      // console.log("UPD PRD", updatedProducts);

      setProductList(updatedProducts);
      setErrorLoading(false);
      setIsLoading(false);
    } catch (error) {
      // console.log(error?.response?.status);
      createToastMessage("Error fetching products!", 4);
      setErrorLoading(true);
      setIsLoading(false);
      isTokenExpired(error?.response?.status);
    }
  };

  const handleRefresh = () => {
    fetchProductDataList();
  };

  useEffect(() => {
    fetchProductDataList();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex mx-auto h-screen text-center items-center justify-center text-3xl">
          <HashLoader size={30} loading={isLoading} />
        </div>
      ) : (
        <div className="max-w-6xl mx-auto p-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              Products
              <p className="text-xs text-slate-400">
                Browse all kind of products in one place
              </p>
            </h1>
            <Link
              to="/products/create"
              className="flex items-center rounded-md px-6 py-2 text-sm font-medium text-white bg-green-400 hover:bg-green-600 transition duration-100"
            >
              <AiOutlinePlusSquare className="text-xl mr-1" />
              New Product
            </Link>
          </div>
          {errorLoading ? (
            <ErrorProductFetch onRefresh={handleRefresh} />
          ) : productList.length === 0 ? (
            <EmptyProduct />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {productList.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Products;
