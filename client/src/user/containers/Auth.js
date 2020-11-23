import React, { Fragment, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import AvatarImage from "../../shared/assets/5.png";
import Card from "../../shared/components/UIElements/Card/Card";
import "./Auth.css";
import Button from "../../shared/components/UIElements/Button/Button";
import Input from "../../shared/components/UIElements/Input/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
} from "../../shared/util/validators";
import useFormHook from "../../shared/hooks/form-hook";
import Avatar from "../../shared/components/UIElements/Avatar/Avatar";
import ErrorModal from "../../shared/components/UIElements/Modal/ErrorModal";
import Spinner from "../../shared/components/UIElements/Spinner/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";
import useHttpHooks from "../../shared/hooks/http-hooks";
import ImageUpload from "../../shared/components/UIElements/ImageUpload/ImageUpload";

const Auth = () => {
  const authenticate = useContext(AuthContext);
  const [newUser, setNewUser] = useState(false);

  const { loading, error, getRequest, clearError } = useHttpHooks();

  const [formState, inputChangeHandler, initInputHandler] = useFormHook(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const history = useHistory();

  const submitFormHandler = async (event) => {
    event.preventDefault();
    console.log(formState.inputs);

    if (newUser) {
      const formData = new FormData();
      formData.append("userName", formState.inputs.userName.value);
      formData.append("userImage", formState.inputs.userImage.value);
      formData.append("userEmail", formState.inputs.email.value);
      formData.append("userPassword", formState.inputs.password.value);
      try {
        const response = await getRequest(
          process.env.REACT_APP_SERVER_URL + "/users/signup",
          "POST",
          formData
        );

        authenticate.userSignin(response.user.id, response.token);
        history.push("/"); //window.location.replace("/");
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await getRequest(
          process.env.REACT_APP_SERVER_URL + "/users/signin",
          "POST",
          JSON.stringify({
            userEmail: formState.inputs.email.value,
            userPassword: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );

        authenticate.userSignin(response.user.id, response.token);
        history.push("/");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const switchSignModes = () => {
    if (newUser) {
      initInputHandler(
        {
          ...formState.inputs,
          userName: undefined,
          userImage: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      initInputHandler(
        {
          ...formState.inputs,
          userName: {
            value: "",
            isValid: false,
          },
          userImage: {
            value: null,
            isValid: false,
          },
        },
        false
      );
    }
    setNewUser((prevState) => !prevState);
  };

  let primaryButton = "SIGN IN";
  let secondaryButton = "SIGN UP";
  let secondayLabel = " Don't have an account?";
  if (newUser) {
    primaryButton = "CREATE ACCOUNT";
    secondaryButton = "SIGN IN";
    secondayLabel = "Already a Member?";
  }

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication">
        {loading && <Spinner asOverlay />}
        {newUser ? <h2>Welcome to Travel App</h2> : <h2>Welcome Back!</h2>}
        <hr />

        {!newUser && (
          <Avatar
            image={AvatarImage}
            alt="USER"
            className="auth__avatar-image"
          />
        )}

        <form className="place-form" onSubmit={submitFormHandler}>
          {newUser && (
            <div className="auth__user-image">
              <ImageUpload
                previewClass
                center
                id="userImage"
                onImageUpload={inputChangeHandler}
                buttonClass="auth__signup-button"
              />
            </div>
          )}
          {newUser && (
            <Input
              id="userName"
              type="text"
              label="Name"
              element="input"
              placeholder="Official Name"
              errorText="Min Length of 5 characters"
              validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
              onInput={inputChangeHandler}
            />
          )}
          <Input
            id="email"
            type="text"
            label="Email"
            element="input"
            placeholder="Valid Email Address"
            errorText="Please Enter a valid Email"
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
            onInput={inputChangeHandler}
          />
          <Input
            id="password"
            type="text"
            label="Password"
            element="input"
            placeholder="Min length of 8 characters"
            errorText="Please Enter a valid Password"
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(8)]}
            onInput={inputChangeHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            {primaryButton}
          </Button>
        </form>
        {secondayLabel}
        <Button className="auth__signup-button" onClick={switchSignModes}>
          {secondaryButton}
        </Button>
      </Card>
    </Fragment>
  );
};

export default Auth;
