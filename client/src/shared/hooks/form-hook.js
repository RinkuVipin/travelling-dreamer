import { useCallback, useReducer } from "react";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (!state.inputs[inputId]) continue;
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };

    case "INIT_INPUTS":
      return {
        inputs: action.inputValues,
        isValid: action.formIsValid,
      };
    default:
      return state;
  }
};

const useFormHook = (initialState, formValidity) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialState,
    isValid: formValidity,
  });

  console.log(formState);

  const inputChangeHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      value: value,
      isValid: isValid,
      inputId: id,
    });
  }, []);

  const initInputHandler = useCallback((values, isValid) => {
    dispatch({
      type: "INIT_INPUTS",
      inputValues: values,
      formIsValid: isValid,
    });
  }, []);

  return [formState, inputChangeHandler, initInputHandler];
};

export default useFormHook;
