import { useContext } from "react";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { CartContext } from "../../context/CartContext";
import "./CartIcon.scss";

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

  const toggleDropdownHandler = () => setIsCartOpen(!isCartOpen);

  return (
    <div
      className="cart-icon-container"
      onClick={toggleDropdownHandler}
      // onMouseEnter={() => setIsCartOpen(true)}
    >
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{cartCount}</span>
    </div>
  );
};

export default CartIcon;
