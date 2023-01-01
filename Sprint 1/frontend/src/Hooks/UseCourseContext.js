import { Coursecontext } from "../Context/CourseContext";
import { useContext } from "react";

export const UseCourseContext = () => {
  const Context = useContext(Coursecontext);

  if (!Context) {
    throw Error("Use  Context in Provider");
  }

  return Context;
};
