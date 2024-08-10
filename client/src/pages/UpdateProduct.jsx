import { useEffect, useState } from "react";
import ProductForm from "../components/ProductForm";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPrivate from "../middleware/usePrivateAxios";
import { createToastMessage } from "../utils/ToastMessage";

const UpdateProduct = () => {
  const { id } = useParams();
  const [initialFormData, setInitialFormData] = useState({});
  const navigate = useNavigate();
  const axiosPrivateAPI = useAxiosPrivate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProductInfo = async () => {
      try {
        const response = await axiosPrivateAPI.get(`/products/${id}`);

        // console.log("Product Data", response.data);
        setInitialFormData(response.data?.product);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProductInfo();
  }, []);

  const handleProductUpdate = async (formData) => {
    // console.log("formData", formData);
    setIsLoading(true);
    const controller = new AbortController();

    try {
      const response = await axiosPrivateAPI.post(
        "/products/" + id,
        {
          name: formData?.name,
          description: formData?.description,
          price: formData?.price,
          stock: formData?.stock,
          color: formData?.color,
        },
        {
          signal: controller.signal,
        }
      );

      // console.log(response.data);
      setIsLoading(false);
      navigate("/products");
      createToastMessage("Product is successfully updated!", 1);
    } catch (error) {
      // console.log("Error" + error);
      setIsLoading(false);
      createToastMessage("Failed to update product!", 4);
    } finally {
      controller.abort("Aborted Creation");
    }
  };

  return (
    <ProductForm
      initialFormData={initialFormData}
      onSubmit={handleProductUpdate}
      formText="Update Product"
      buttonText="Update"
      isUpdating={isLoading}
    />
  );
};

export default UpdateProduct;
