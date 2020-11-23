import React, { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import PlaceList from "../components/PlaceList";
import useHttpHooks from "../../shared/hooks/http-hooks";
import LoadingSpinner from "../../shared/components/UIElements/Spinner/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/Modal/ErrorModal";

const UserPlaces = () => {
  const [places, setPlaces] = useState();
  const { loading, error, getRequest, clearError } = useHttpHooks();
  const userId = useParams().userId;

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const data = await getRequest(
          `${process.env.REACT_APP_SERVER_URL}/places/user/${userId}`
        );
        setPlaces(data.places);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPlaces();
  }, [getRequest, userId]);

  const loadAfterDelete = (placeId) => {
    setPlaces((prevState) => prevState.filter((place) => place.id !== placeId));
  };

  return (
    <Fragment>
      {loading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      <ErrorModal error={error} onClear={clearError} />
      {places && (
        <PlaceList
          places={places}
          userId={userId}
          loadAfterDelete={loadAfterDelete}
        />
      )}
    </Fragment>
  );
};
export default UserPlaces;
