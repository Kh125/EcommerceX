import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HashLoader } from "react-spinners";

const ProductForm = ({
  initialFormData = {},
  onSubmit,
  formText,
  buttonText,
  isUpdating,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [color, setColor] = useState("");

  useEffect(() => {
    if (Object.keys(initialFormData).length > 0) {
      setName(initialFormData?.name || "");
      setDescription(initialFormData?.description || "");
      setPrice(initialFormData?.price || "");
      setStock(initialFormData?.stock || "");
      setColor(initialFormData?.color || "");
    }
  }, [initialFormData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await onSubmit({
        name,
        description,
        price,
        stock,
        color,
      });

      // console.log("submit success", result);
    } catch (error) {
      console.log("submit error", error);
    }
  };

  return (
    <div className="mt-12 max-w-md mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">{formText}</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="stock"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            Stock
          </label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="color"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            Color
          </label>
          <input
            type="text"
            id="color"
            name="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            placeholder="Enter colors separated by commas"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex space-x-4">
          <Link
            to="/products"
            className="w-1/2 text-center px-4 py-2 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-100"
          >
            Back
          </Link>
          <button
            type="submit"
            className={`w-1/2 px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 ${
              isUpdating
                ? "opacity-50 flex items-center justify-center space-x-3"
                : ""
            }`}
          >
            {!isUpdating && buttonText}
            <HashLoader size={30} loading={isUpdating} color="#FFFFFF" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
