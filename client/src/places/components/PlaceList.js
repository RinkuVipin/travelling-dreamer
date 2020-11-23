import React, { useContext } from "react";
import Button from "../../shared/components/UIElements/Button/Button";
import Card from "../../shared/components/UIElements/Card/Card";
import { AuthContext } from "../../shared/context/auth-context";
import PlaceItem from "./PlaceItem";
import "./PlaceList.css";

const PlaceList = (props) => {
  const { loggedUser } = useContext(AuthContext);

  if (props.places.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No Places Found!</h2>
          {props.userId === loggedUser && (
            <>
              <h2>Do you want to create one ?</h2>{" "}
              <Button to="/places/new">Share Place</Button>{" "}
            </>
          )}
        </Card>
      </div>
    );
  }

  return (
    <ul className="place-list">
      {props.places.map((place) => (
        <PlaceItem
          key={place.id}
          placeId={place.id}
          image={place.image}
          title={place.title}
          description={place.description}
          address={place.address}
          creatorId={place.creatorId}
          coordinates={place.location}
          loadAfterDelete={props.loadAfterDelete}
        />
      ))}
    </ul>
  );
};

export default PlaceList;
