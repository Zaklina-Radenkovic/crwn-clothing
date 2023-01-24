import { useState, useEffect, createContext } from "react";
import {
  //addCollectionAndDocuments,
  getCategoriesAndDocuments,
} from "../utils/firebase/firebase";

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  // this we add ONLY ONCE (the first time), because every time will add new sets of value
  // useEffect(() => {
  //   addCollectionAndDocuments("categories", SHOP_DATA);
  // });

  useEffect(() => {
    //calling 'async' fnc inside of useeffect
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments("categories");
      // console.log(categoryMap);
      setCategoriesMap(categoryMap);
    };
    getCategoriesMap();
  }, []);

  const value = { categoriesMap };
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
