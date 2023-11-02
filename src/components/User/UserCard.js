import React from "react";
import { Link } from "react-router-dom";

const UserCard = ({ id, email, username, phone }) => {
  return (
    <div className="ui link cards">
      <div className="card">
        <div className="content">
          <div className="header">{username}</div>
          <div className="meta price">{email}</div>
          <div className="meta">{phone}</div>
          {/* <AddToCartBtn pid={id} /> */}
        </div>

        <Link to={`/user/${id}`} class="btn btn-warning ">
          Go to Details
        </Link>
      </div>
    </div>
  );
};

export default UserCard;
