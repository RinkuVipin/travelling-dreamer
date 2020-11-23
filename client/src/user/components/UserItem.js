import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../../shared/components/UIElements/Avatar/Avatar";
import Card from "../../shared/components/UIElements/Card/Card";
import "./UserItem.css";

const UserItem = (props) => {
  return (
    <li className="user-item">
      <Card className="user-item__content">
        <Link to={`places/user/${props.userId}`}>
          <div className="user-item__image">
            <Avatar
              image={`${process.env.REACT_APP_ASSETS_URL}/${props.userImage}`}
              alt={props.userName}
            />
          </div>
          <div className="user-item__info">
            <h2>{props.userName}</h2>
            <h3>
              {props.visitedPlaces}
              {props.visitedPlaces === 1 ? " Place" : " Places"}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserItem;
