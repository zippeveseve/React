import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserList from "./UserList";

import SortButton from "./UserSort";
import Search from "../ListingComponents/Search";
import axios from "axios";
import { setUsers } from "../../redux/actions/userAction";

const UserComponent = ({ users }) => {
  // const users = useSelector((state) => state.allUsers.users);
  const [searchValue, setSearchValue] = useState("");
  const [filteredItems, setFilteredItems] = useState(users);
  const [selectedLimit, setSelectedLimit] = useState(null);

  const dispatch = useDispatch();
  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `https://fakestoreapi.com/users?limit=${selectedLimit}`
      );
      dispatch(setUsers(response.data));
    } catch (error) {}
  };

  useEffect(() => {
    const lowerCaseSearchValue = searchValue.toLowerCase();
    setFilteredItems(
      users.filter((item) =>
        item.username.toLowerCase().includes(lowerCaseSearchValue)
      )
    );
  }, [users, searchValue]);

  useEffect(() => {
    fetchUsers();
  }, [selectedLimit]);

  return (
    <>
      <div className="d-flex w-100 justify-content-between align-items-center mt-4">
        <SortButton list={filteredItems} onSort={setFilteredItems} />
        <Search
          value={searchValue}
          onChangeData={(e) => setSearchValue(e.target.value)}
        />
        <select
          class="form-select w-25"
          aria-label="Default select example"
          onChange={(e) => setSelectedLimit(e.target.value)}
        >
          <option selected disabled>
            select limit
          </option>
          <option value="5">5</option>
          <option value="10">10</option>
        </select>
        {/* <AddProduct /> */}
      </div>

      <UserList users={filteredItems} />
    </>
  );
};

export default UserComponent;
