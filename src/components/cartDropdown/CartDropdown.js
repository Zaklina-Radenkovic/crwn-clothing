import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import CartItem from "../cartItem/CartItem";
import Button from "../button/Button";
import "./CartDropdown.scss";

const CartDropdown = () => {
  const { cartItems, setIsCartOpen } = useContext(CartContext);
  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    navigate("/checkout");
    setIsCartOpen(false);
  };

  return (
    <div
      className="cart-dropdown-container"
      style={{ height: `${cartItems.length === 0 ? "140px" : "340px"}` }}
    >
      {cartItems.length ? (
        <div className="cart-items">
          {cartItems.map((item) => {
            return <CartItem cartItem={item} key={item.id} />;
          })}
        </div>
      ) : (
        <div className="empty-message">Your cart is empty</div>
      )}
      <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;
