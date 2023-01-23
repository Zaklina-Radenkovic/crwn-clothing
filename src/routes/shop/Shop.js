import { Routes, Route } from "react-router-dom";
import Category from "../category/Category";
import CategoriesPreview from "../categoriesPreview/CategoriesPreview";
import "./Shop.scss";

const Shop = () => {
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};
export default Shop;
