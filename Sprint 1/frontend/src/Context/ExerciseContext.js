import React, { createContext, useState, useReducer } from "react";

//create reducer function to handle state changes in the context object (state) and the action to be performed on the state object (action)
export const ExerciseContext = createContext();
const ExerciseReducer = (state, action) => {
  switch (action.type) {
    case "SET_EXERCISE":
      return { exercises: action.payload };
    case "CREATE_EXERCISE":
      return { exercises: [action.payload, ...state.exercises] };
    default:
      return state;
  }
};
//create context provider to wrap the entire application and provide the context object to any child component
export const ExerciseContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ExerciseReducer, { exercises: null });
  return (
    <ExerciseContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ExerciseContext.Provider>
  );
};
//create a custom hook to access the context object from any child component
export const useExerciseContext = () => {
  return React.useContext(ExerciseContext);
};

//create a custom hook to access the dispatch function from any child component
export const useExerciseDispatch = () => {
  const context = React.useContext(ExerciseContext);
  if (context === undefined) {
    throw new Error(
      "useExerciseDispatch must be used within a ExerciseContextProvider"
    );
  }
  return context.dispatch;
};
