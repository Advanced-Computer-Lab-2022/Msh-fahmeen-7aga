import { createContext, useReducer } from "react";

export const Coursecontext = createContext();

export const courseReducer = (state, action) => {
  switch (action.type) {
    case "SET_COURSE":
      return { courses: action.payload };
    case "CREATE_COURSE":
      return { courses: [action.payload, ...state.courses] };
    default:
      return state;
  }
};

export const CourseContextprovider = ({ children }) => {
  const [state, dispatch] = useReducer(courseReducer, { courses: null });

  return (
    <Coursecontext.Provider value={{ ...state, dispatch }}>
      {children}
    </Coursecontext.Provider>
  );
};
