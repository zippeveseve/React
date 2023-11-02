import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setProducts } from "../../redux/actions/productsActions";
import FilterCategory from "../ListingComponents/FilterCategory";
import Search from "../ListingComponents/Search";
import SortButton from "../ListingComponents/Sort";
import ProductAdd from "./ProductAdd";
import ProductList from "./ProductList";

const ProductComponent = ({ products }) => {
  // const products = useSelector((state) => state.allProducts.products);
  const [searchValue, setSearchValue] = useState("");
  const [filteredItems, setFilteredItems] = useState(products);
  const [selectedLimit, setSelectedLimit] = useState(20);

  const dispatch = useDispatch();
  const fetchProduct = async (limit) => {
    try {
      const response = await axios.get(
        `https://fakestoreapi.com/products?limit=${limit}`
      );
      dispatch(setProducts(response.data));
    } catch (error) {}
  };

  useEffect(() => {
    const lowerCaseSearchValue = searchValue.toLowerCase();
    setFilteredItems(
      products.filter((item) =>
        item.title.toLowerCase().includes(lowerCaseSearchValue)
      )
    );
  }, [products, searchValue]);

  // useEffect(() => {
  //   if (products.len) {
  //     fetchProduct();
  //   }
  // }, [selectedLimit]);
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            {" "}
            <SortButton list={filteredItems} onSort={setFilteredItems} />
          </div>

          <div className="col d-flex flex-column align-items-end">
            <ProductAdd />
          </div>
        </div>
        <div className="row mt-2">
          <div className="col col-md-4 col-sm-12 col-xs-12 mt-2">
            {" "}
            <Search
              value={searchValue}
              onChangeData={(e) => setSearchValue(e.target.value)}
            />
          </div>
          <div className="col  col-md-4 col-sm-12 col-xs-12 mt-2">
            <FilterCategory />
          </div>{" "}
          <div className="col col-md-4 col-sm-12 col-xs-12 mt-2">
            <select
              class="form-select w-50 "
              aria-label="Default select example"
              onChange={(e) => {
                fetchProduct(e.target.value);
              }}
            >
              <option selected disabled>
                select limit
              </option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
          </div>
        </div>
      </div>
      <ProductList products={filteredItems} />
    </>
  );
};

export default ProductComponent;
