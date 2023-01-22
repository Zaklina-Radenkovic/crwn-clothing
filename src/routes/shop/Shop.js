import { useContext } from "react";
import { ProductsContext } from "../../components/context/ProductContext";
import ProductCard from "../../components/productCard/ProductCard";
import "./Shop.scss";

const Shop = () => {
  const { products } = useContext(ProductsContext);
  return (
    <div className="products-container">
      {products.map((product) => {
        return <ProductCard product={product} key={product.id} />;
      })}
    </div>
  );
};
export default Shop;
