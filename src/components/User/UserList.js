import React from "react";
import UserCard from "./UserCard";

const UserList = ({ users }) => (
  <div className="row my-5">
    {users.map((user, index) => (
      <div className="col-lg-3 col-md-4 my-5" key={index}>
        <UserCard {...user} />
      </div>
    ))}
  </div>
);

export default UserList;
