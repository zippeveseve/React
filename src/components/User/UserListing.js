import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../../redux/actions/userAction";
import Loader from "../Loader";
import UserRegistrationModal from "./Modals/UserRegistrationModal";
import UserComponent from "./UserComponent";
import Pagination from "../ListingComponents/Pagination";

const UserListing = () => {
  const dispatch = useDispatch();
  let { users } = useSelector((state) => state.allUsers);

  const [currentList, setCurrentList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://fakestoreapi.com/users`);
      dispatch(setUsers(response.data));
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (users.length === 0) {
      fetchUsers();
    }
  }, []);

  return loading ? (
    <div
      class="d-flex  justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Loader />
    </div>
  ) : (
    <div className="ui grid container">
      <div className="w-100 d-flex justify-content-end">
        {" "}
        <button className="btn btn-lg btn-success " onClick={handleShowModal}>
          Add user
        </button>
      </div>

      <UserComponent users={currentList} />
      <div className="d-flex w-100 justify-content-center">
        <Pagination data={users} perPage={4} onPageChange={setCurrentList} />
      </div>
      <UserRegistrationModal show={showModal} onHide={handleCloseModal} />
    </div>
  );
};

export default UserListing;
