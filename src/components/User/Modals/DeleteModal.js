import axios from "axios";
import React from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const DeleteModal = ({ show, onHide, id }) => {
  const history = useHistory();

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      await axios
        .delete(`https://fakestoreapi.com/users/${id}`)
        .then((response) => {
          toast.success("Item deleted successfully");
          onHide();
          history.push("/user");
        });
    } catch (error) {
      console.log("error: ", error);
    }
  };
  return (
    <div
      className={`modal${show ? " show" : ""}`}
      tabIndex="-1"
      role="dialog"
      style={{ display: show ? "block" : "none" }}
    >
      <div className="modal-dialog " role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirm Delete</h5>
          </div>
          <div className="modal-body ">Are you sure? </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onHide}
            >
              Close
            </button>{" "}
            <button
              type="button"
              className="btn btn-danger"
              onClick={(e) => handleDelete(e)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
