import { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import ProductCard from "../../components/productCard/ProductCard";
import { CartContext } from "../../context/CartContext";
import { CategoriesContext } from "../../context/CategoriesContext";

import "./Category.scss";

const Category = () => {
  //useParams is a hook that gives us an object of key/value pairs of the dynamic params from the current URL that were matched by the Route path. In our case, It's '<Route path=":category"> that we set in shop.component
  const { category } = useParams();

  const { categoriesMap } = useContext(CategoriesContext);
  // console.log(categoriesMap[category]);
  const [products, setProducts] = useState(categoriesMap[category]);

  const { setIsCartOpen } = useContext(CartContext);

  const onCloseHandler = () => {
    setIsCartOpen(false);
  };

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <div onMouseOver={onCloseHandler}>
      {String.fromCharCode(8592)}{" "}
      <Link
        className="nav-link"
        style={{ textDecoration: "underline" }}
        to="/shop"
      >
        back to Shop
      </Link>
      <h2 className="category-title">{category.toUpperCase()}</h2>
      <div className="category-container">
        {/* setting safeguard if we for some reason don`t have products (because it is async): we need '&&' */}
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default Category;
