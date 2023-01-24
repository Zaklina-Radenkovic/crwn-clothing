import { useContext } from "react";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { CartContext } from "../../context/CartContext";
import "./CartIcon.scss";

const CartIcon = () => {
  const { setIsCartOpen, cartCount } = useContext(CartContext);

  // const total = cartItems
  //   .map(({ quantity }) => quantity)
  //   .reduce((acc, quantity) => acc + quantity, 0);

  return (
    <div
      className="cart-icon-container"
      onClick={() => setIsCartOpen(false)}
      onMouseEnter={() => setIsCartOpen(true)}
    >
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{cartCount}</span>
    </div>
  );
};

export default CartIcon;
