import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setProducts } from "../../redux/actions/productsActions";

const FilterCategory = () => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products/categories")
      .then((response) => {
        setCategories(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      axios
        .get(`https://fakestoreapi.com/products/category/${selectedCategory}`)
        .then((response) => {
          dispatch(setProducts(response.data));
        })
        .catch((error) => {
          console.error("Error fetching jewelery items:", error);
        });
    }
  }, [selectedCategory]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="dropdown">
        <button
          className="btn btn-lg btn-outline-warning dropdown-toggle"
          type="button"
          id="categoryDropdown"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Select Category
        </button>
        <div className="dropdown-menu" aria-labelledby="categoryDropdown">
          {categories.map((category) => (
            <button
              className="dropdown-item"
              onClick={() => handleCategorySelect(category)}
              key={category}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterCategory;
