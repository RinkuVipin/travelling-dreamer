import React, { Fragment, useContext } from "react";
import { useHistory } from "react-router-dom";
import Button from "../../shared/components/UIElements/Button/Button";
import Input from "../../shared/components/UIElements/Input/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import useFormHook from "../../shared/hooks/form-hook";
import "./PlaceForm.css";
import useHttpHooks from "../../shared/hooks/http-hooks";
import LoadingSpinner from "../../shared/components/UIElements/Spinner/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/Modal/ErrorModal";
import { AuthContext } from "../../shared/context/auth-context";
import ImageUpload from "../../shared/components/UIElements/ImageUpload/ImageUpload";

const NewPlace = () => {
  const { loading, error, getRequest, clearError } = useHttpHooks();

  const history = useHistory();
  const { loggedUser, token } = useContext(AuthContext);

  const [formState, inputChangeHandler] = useFormHook(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  const submitFormHandler = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", formState.inputs.title.value);
      formData.append("description", formState.inputs.description.value);
      formData.append("address", formState.inputs.address.value);
      formData.append("image", formState.inputs.image.value);
      formData.append("creatorId", loggedUser);

      await getRequest(
        process.env.REACT_APP_SERVER_URL + "/places",
        "POST",
        formData,
        {
          Authorization: "Bearer " + token,
        }
      );
      history.replace(`/places/user/${loggedUser}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={submitFormHandler}>
        {loading && <LoadingSpinner asOverlay />}

        <Input
          id="title"
          type="text"
          label="Title"
          element="input"
          placeholder="Title"
          errorText="Please Enter a valid title"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
          onInput={inputChangeHandler}
        />
        <Input
          id="address"
          type="text"
          label="Address"
          element="input"
          placeholder="Address"
          errorText="Please Enter a valid address"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
          onInput={inputChangeHandler}
        />

        <Input
          id="description"
          label="Description"
          element="textarea"
          errorText="Please Enter a valid description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          onInput={inputChangeHandler}
        />
        <ImageUpload
          center
          id="image"
          onImageUpload={inputChangeHandler}
          buttonClass="auth__signup-button"
        />

        <Button type="submit" disabled={!formState.isValid}>
          SUBMIT
        </Button>
      </form>
    </Fragment>
  );
};

export default NewPlace;
