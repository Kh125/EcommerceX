import { useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import useAxiosPrivate from "../middleware/usePrivateAxios";
import { createToastMessage } from "../utils/ToastMessage";
import { useState } from "react";

const CreateProduct = () => {
  const navigate = useNavigate();
  const axiosPrivateAPI = useAxiosPrivate();
  const [isLoading, setIsLoading] = useState(false);

  const handleProductCreate = async (formData) => {
    setIsLoading(true);
    // console.log("formData", formData);
    const controller = new AbortController();

    try {
      const response = await axiosPrivateAPI.post(
        "/products",
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
      createToastMessage("Product is successfully created!", 1);
    } catch (error) {
      setIsLoading(false);
      console.log("Error" + error);
      createToastMessage("Failed to create product!", 4);
    } finally {
      controller.abort("Aborted Creation");
    }
  };

  return (
    <ProductForm
      onSubmit={handleProductCreate}
      formText="Create New Product"
      buttonText="Create"
      isUpdating={isLoading}
    />
  );
};

export default CreateProduct;
