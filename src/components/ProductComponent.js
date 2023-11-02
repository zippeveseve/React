import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FilterCategory from "./FilterCategory";
import ProductList from "./ProductList";
import Search from "./Search";
import SortButton from "./Sort";
import AddProduct from "./AddProduct";

const ProductComponent = () => {
  const products = useSelector((state) => state.allProducts.products);
  const [searchValue, setSearchValue] = useState("");
  const [filteredItems, setFilteredItems] = useState(products);

  useEffect(() => {
    const lowerCaseSearchValue = searchValue.toLowerCase();
    setFilteredItems(products.filter((item) => item.title.toLowerCase().includes(lowerCaseSearchValue)));
  }, [products, searchValue]);

  return (
    <>
      <div className="d-flex w-100 justify-content-between align-items-center">  
         <SortButton list={filteredItems} onSort={setFilteredItems} />
         <Search value={searchValue} onChangeData={(e) => setSearchValue(e.target.value)} />
         <FilterCategory/>
         <AddProduct/>
      </div>
      <ProductList products={filteredItems} />
  
    </>
  );
};

export default ProductComponent;
