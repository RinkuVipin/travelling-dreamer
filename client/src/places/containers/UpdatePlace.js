import React, { Fragment, useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Button from "../../shared/components/UIElements/Button/Button";
import Input from "../../shared/components/UIElements/Input/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import useFormHook from "../../shared/hooks/form-hook";
import "./PlaceForm.css";
import Card from "../../shared/components/UIElements/Card/Card";
import useHttpHooks from "../../shared/hooks/http-hooks";
import LoadingSpinner from "../../shared/components/UIElements/Spinner/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/Modal/ErrorModal";
import { AuthContext } from "../../shared/context/auth-context";

const UpdatePlace = () => {
  const placeId = useParams().placeId;
  const [updatePlace, setUpdatePlace] = useState();
  const { loading, error, getRequest, clearError } = useHttpHooks();

  const [formState, inputChangeHandler, initInputHandler] = useFormHook(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const history = useHistory();
  const { loggedUser, token } = useContext(AuthContext);

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const data = await getRequest(
          `${process.env.REACT_APP_SERVER_URL}/places/${placeId}`
        );
        setUpdatePlace(data.place);
        initInputHandler(
          {
            title: {
              value: data.place.title,
              isValid: true,
            },
            description: {
              value: data.place.description,
              isValid: true,
            },
          },
          true
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchPlace();
  }, [getRequest, placeId, initInputHandler]);

  const submitFormHandler = async (event) => {
    event.preventDefault();
    try {
      await getRequest(
        `${process.env.REACT_APP_SERVER_URL}/places/${placeId}`,
        "PATCH",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        }
      );
      history.replace(`/places/user/${loggedUser}`);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!updatePlace && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Sorry! Cannot Find the place</h2>
        </Card>
      </div>
    );
  }

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {updatePlace && !loading && (
        <form className="place-form" onSubmit={submitFormHandler}>
          <Input
            id="title"
            type="text"
            label="Title"
            element="input"
            errorText="Please Enter a valid title"
            validators={[VALIDATOR_REQUIRE()]}
            initialValue={updatePlace.title}
            onInput={inputChangeHandler}
            isInitialValid={true}
          />
          <Input
            id="description"
            label="Description"
            element="textarea"
            errorText="Please Enter a valid description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            initialValue={updatePlace.description}
            onInput={inputChangeHandler}
            isInitialValid={true}
          />

          <Button type="submit" disabled={!formState.isValid}>
            UPDATE PLACE
          </Button>
        </form>
      )}
    </Fragment>
  );
};

export default UpdatePlace;
