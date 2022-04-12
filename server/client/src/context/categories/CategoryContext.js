import { categoryColors, categoryIcons } from "helper/categoriesObject.const";
import { useMemo, useCallback } from "react";

const { useState, createContext, useContext, useEffect } = require("react");

const CategoryContext = createContext();
const categoryLength = categoryColors.length;

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

  // const state = {
  //   categoryColorState,
  //   categoryIconState,
  //   setColorIndex,
  // };

  const setColorIndex = useCallback((index) => {
    if (typeof index !== "number") return;
    const modIndex = index % categoryLength;
    setCategoryColorState({
      index: index,
      value: categoryColors[modIndex],
    });
  })

  const state = {
    categoryColorState,
    categoryIconState,
    setColorIndex,
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
