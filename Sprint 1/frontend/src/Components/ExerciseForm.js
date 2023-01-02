import { useState } from "react";
import { useExerciseContext } from "../Context/ExerciseContext";

const ExerciseForm = () => {
  const { dispatch } = useExerciseContext();
  const [title, setTitle] = useState("");
  const [question1Text, setquestion1Text] = useState("");
  const [answer1Options, setanswer1Options] = useState("");
  const [question2Text, setquestion2Text] = useState("");
  const [answer2Options, setanswer2Options] = useState("");
  const [question3Text, setquestion3Text] = useState("");
  const [answer3Options, setanswer3Options] = useState("");
  const [question4Text, setquestion4Text] = useState("");
  const [answer4Options, setanswer4Options] = useState("");
    const [error, setError] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();

  const exercise = {
    title,
    question1Text,
    answer1Options,
    question2Text,
    answer2Options,
    question3Text,
    answer3Options,
    answer3Options,
    question4Text,
    answer4Options,
  };

  const response = await fetch("http://localhost:4000/exercise/createExercise", {
    method: "POST",
    body: JSON.stringify(exercise),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();

  if (!response.ok) {
    setError(json.error);
  }
  if (response.ok) {
    setTitle("");
    setquestion1Text("");
    setanswer1Options("");
    setquestion2Text("");
    setanswer2Options("");
    setquestion3Text("");
    setanswer3Options("");
    setquestion4Text("");
    setanswer4Options("");

    console.log("New Exercise added", json);
    dispatch({ type: "CREATE_EXERCISE ", payload: json });
  }
};

return (
  <form className="create" onSubmit={handleSubmit}>
    <h3>Add a new exercise</h3>

    <label>Exercise title:</label>
    <input
      type="text"
      onChange={(e) => setTitle(e.target.value)}
      value={title}
    />

    <label>Question 1:</label>
    <input
      type="text"
      onChange={(e) => setquestion1Text(e.target.value)}
      value={question1Text}
    />

    <label>Answer 1:</label>
    <input
      type="text"
      onChange={(e) => setanswer1Options(e.target.value)}
      value={answer1Options}
    />

    <label>Question 2:</label>
    <input
      type="text"
      onChange={(e) => setquestion2Text(e.target.value)}
      value={question2Text}
    />

    <label>Answer 2:</label>
    <input
      type="text"
      onChange={(e) => setanswer2Options(e.target.value)}
      value={answer2Options}
    />

    <label>Question 3:</label>
    <input
      type="text"
      onChange={(e) => setquestion3Text(e.target.value)}
      value={question3Text}
    />

    <label>Answer 3:</label>
    <input
      type="text"
      onChange={(e) => setanswer3Options(e.target.value)}
      value={answer3Options}
    />

    <label>Question 4:</label>
    <input
      type="text"
      onChange={(e) => setquestion4Text(e.target.value)}
      value={question4Text}
    />

    <label>Answer 4:</label>
    <input
      type="text"
      onChange={(e) => setanswer4Options(e.target.value)}
      value={answer4Options}
    />

    <button>Add exercise</button>
  </form>
);
};

export default ExerciseForm;
