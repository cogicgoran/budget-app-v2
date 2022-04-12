import { categoryColors, categoryIcons } from "helper/categoriesObject.const";
import { useState, createContext, useContext } from "react";

const categoryLength = categoryColors.length;
const iconsLength = categoryIcons.length;

const CategoryContext = createContext();

function CategoryContextProvider({ children }) {
  const initColorState = {
    index: 0,
    value: categoryColors[0],
  };
  const initIconState = {
    index: 0,
    value: categoryIcons[0],
  };
  const [categoryColorState, setCategoryColorState] = useState(initColorState);
  const [categoryIconState, setCategoryIconState] = useState(initIconState);

  const setColorIndex = (index) => {
    if (typeof index !== "number") return;
    const modIndex = index % categoryLength;
    setCategoryColorState({
      index: index,
      value: categoryColors[modIndex],
    });
  };

  const setIconIndex = (index) => {
    if (typeof index !== "number") return;
    const modIndex = index % iconsLength;
    setCategoryIconState({
      index: index,
      value: categoryIcons[modIndex],
    });
  };

  const state = {
    categoryColorState,
    categoryIconState,
    setColorIndex,
    setIconIndex,
  };

  return (
    <CategoryContext.Provider value={state}>
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategoryContext() {
  const context = useContext(CategoryContext);
  if (context === undefined) {
    throw new Error("useCount must be used within a CountProvider");
  }
  return context;
}

export default CategoryContextProvider;
