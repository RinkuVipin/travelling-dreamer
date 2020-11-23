import React, { useEffect, useReducer } from "react";
import { validate } from "../../../util/validators";
import "./Input.css";

const InputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        inputValue: action.value,
        isValid: validate(action.value, action.validators),
      };
    case "FOCUS":
      return {
        ...state,
        isFocused: true,
      };
    default:
      return state;
  }
};

const Input = (props) => {
  const [state, dispatch] = useReducer(InputReducer, {
    inputValue: props.initialValue || "",
    isFocused: false,
    isValid: props.isInitialValid || false,
  });

  const { id, onInput } = props;
  const { inputValue, isValid } = state;

  useEffect(() => {
    onInput(id, inputValue, isValid);
  }, [onInput, id, inputValue, isValid]);

  const valueChangeHandler = (event) => {
    dispatch({
      type: "CHANGE",
      value: event.target.value,
      validators: props.validators,
    });
  };

  const focusHandler = (event) => {
    dispatch({
      type: "FOCUS",
    });
  };

  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={valueChangeHandler}
        onBlur={focusHandler}
        value={state.inputValue}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={valueChangeHandler}
        onBlur={focusHandler}
        value={state.inputValue}
      />
    );

  return (
    <div
      className={`form-control ${
        !state.isValid && state.isFocused && "form-control__invalid"
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!state.isValid && state.isFocused && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
