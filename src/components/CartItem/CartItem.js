import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";

const CartItem = ({ quantity, price, name, itemId }) => {
  const { removeItem , quantityPrice } = useContext(CartContext);
  
  const handleRemoveItem = () => {
    removeItem(itemId);
  };
  

  return (
    <div>
      <h4>{name}</h4>
      <p>Cantidad: {quantity}</p>
      <p>Valor: ${price}</p>
      <p>Subtotal: ${price*quantity}</p>
      <button onClick={handleRemoveItem}>Eliminar</button>
    </div>
  );
};

export default CartItem;