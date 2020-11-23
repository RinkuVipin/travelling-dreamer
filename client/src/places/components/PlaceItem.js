import React, { Fragment, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "../../shared/components/UIElements/Button/Button";
import Card from "../../shared/components/UIElements/Card/Card";
import Map from "../../shared/components/UIElements/Map/Map";
import Modal from "../../shared/components/UIElements/Modal/Modal";
import { AuthContext } from "../../shared/context/auth-context";
import "./PlaceItem.css";
import useHttpHooks from "../../shared/hooks/http-hooks";
import ErrorModal from "../../shared/components/UIElements/Modal/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/Spinner/LoadingSpinner";

const PlaceItem = (props) => {
  const { loading, error, getRequest, clearError } = useHttpHooks();

  const history = useHistory();
  const { isSignedIn, loggedUser, token } = useContext(AuthContext);

  const [showMap, setShowMap] = useState(false);
  const [showDelPopup, setShowDelPopup] = useState(false);

  const openMapHandler = () => setShowMap(true);

  const closeMapHandler = () => setShowMap(false);

  const showDelPopupHandler = () => setShowDelPopup(true);

  const cancelDelPopupHandler = () => setShowDelPopup(false);

  const confirmDelPopupHandler = async () => {
    setShowDelPopup(false);
    try {
      await getRequest(
        `${process.env.REACT_APP_SERVER_URL}/places/${props.placeId}`,
        "DELETE",
        null,
        {
          Authorization: "Bearer " + token,
        }
      );
      props.loadAfterDelete(props.placeId);
      history.replace(`/places/user/${loggedUser}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <div className="place-item__map-container">
          <Map center={props.coordinates} zoom={16} />
        </div>
      </Modal>

      <Modal
        show={showDelPopup}
        onCancel={cancelDelPopupHandler}
        header="Delete Place ?"
        footerClass="place-item__modal-actions"
        footer={
          <Fragment>
            <Button onClick={cancelDelPopupHandler} inverse>
              CANCEL
            </Button>
            <Button onClick={confirmDelPopupHandler} danger>
              DELETE
            </Button>
          </Fragment>
        }
      >
        <p>Are you sure you want to delete this place permanently ? </p>
      </Modal>

      <li className="place-item">
        <Card className="place-item__content">
          {loading && <LoadingSpinner asOverlay />}
          <div className="place-item__image">
            <img
              src={`${process.env.REACT_APP_ASSETS_URL}/${props.image}`}
              alt={props.title}
            />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMapHandler}>
              VIEW ON MAP
            </Button>
            {isSignedIn && loggedUser === props.creatorId && (
              <Button to={`/places/${props.placeId}`}>EDIT</Button>
            )}
            {isSignedIn && loggedUser === props.creatorId && (
              <Button danger onClick={showDelPopupHandler}>
                DELETE
              </Button>
            )}
          </div>
        </Card>
      </li>
    </Fragment>
  );
};

export default PlaceItem;
