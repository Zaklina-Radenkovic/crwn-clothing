import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import CheckoutItem from "../../components/checkoutItem/CheckoutItem";
import "./CheckOut.scss";

const CheckOut = () => {
  const { cartItems, cartTotal, setIsCartOpen } = useContext(CartContext);

  return (
    <div
      className="checkout-container"
      onMouseOver={() => setIsCartOpen(false)}
    >
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map((cartItem) => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}
      <div className="total">TOTAL: ${cartTotal}</div>
    </div>
  );
};
export default CheckOut;
