import React from "react";
import Card from "../../shared/components/UIElements/Card/Card";
import UserItem from "./UserItem";
import "./UserList.css";

const UserList = (props) => {
  if (props.users.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No registered users found.</h2>
        </Card>
      </div>
    );
  }
  return (
    <ul className="users-list">
      {props.users.map((user) => (
        <UserItem
          key={user.id}
          userId={user.id}
          userName={user.name}
          userImage={user.image}
          visitedPlaces={user.places.length}
        />
      ))}
    </ul>
  );
};

export default UserList;
