import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import Button from "../button/Button";
import "./ProductCard.scss";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const { addItemToCart } = useContext(CartContext);

  const addProduct = () => addItemToCart(product);

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button buttonType="inverted" onClick={addProduct}>
        Add to card
      </Button>
    </div>
  );
};

export default ProductCard;
