import { useContext, Fragment } from "react";

import { CategoriesContext } from "../../context/CategoriesContext";
import CategoryPreview from "../../components/categoryPreview/CategoryPreview";

const CategoriesPreview = () => {
  const { categoriesMap } = useContext(CategoriesContext);

  return (
    <div>
      {Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title];
        return (
          <CategoryPreview key={title} title={title} products={products} />
        );
      })}
    </div>
  );
};

export default CategoriesPreview;
