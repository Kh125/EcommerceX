import { useContext } from "react";
import CartContext from "./CartProvider";

const useCartContext = () => {
  return useContext(CartContext);
};

export default useCartContext;
