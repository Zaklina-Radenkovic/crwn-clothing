import { Link } from "react-router-dom";
import { useContext } from "react";
import ProductCard from "../productCard/ProductCard";

import "./CategoryPreview.scss";
import { CartContext } from "../../context/CartContext";

const CategoryPreview = ({ title, products }) => {
  const { setIsCartOpen } = useContext(CartContext);
  return (
    <div
      className="category-preview-container"
      onMouseOver={() => setIsCartOpen(false)}
    >
      <h2>
        <Link className="title" to={title}>
          {title.toUpperCase()}
        </Link>
      </h2>
      <div className="preview">
        {products
          .filter((_, idx) => idx < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default CategoryPreview;
