import React, { useState, useEffect } from 'react';

const ProblemList = () => {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('http://localhost:4000/guest/problems', {
        method: 'POST',
      });
      const data = await result.json();
      setProblems(data);
    };
    fetchData();
  }, []);

  const markProblemAsResolved = async (problem) => {
    try {
      // send a POST request to the backend to mark the problem as resolved
      await fetch('http://localhost:4000/guest/mark-problem-as-resolved', {
        method: 'POST',
        body: JSON.stringify({ problemId: problem._id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // remove the problem from the list of problems
      setProblems(problems.filter((p) => p._id !== problem._id));
      // show a success message to the user
      alert('Problem marked as resolved.');
    } catch (error) {
      console.error(error);
      // show an error message to the user
      alert('Error marking problem as resolved. Please try again later.');
    }
  };
  

return (
<div className="problem-list">
<h2>Reported Problems</h2>
<table>
<thead>
<tr>
<th>Problem</th>
<th>Course Name</th>
<th>Actions</th>
</tr>
</thead>
<tbody>
{problems.map((problem) => (
<tr key={problem._id}>
<td>{problem.Problem}</td>
<td>{problem.CourseName}</td>
<td>
<button onClick={() => markProblemAsResolved(problem)}>Mark as Resolved</button>
</td>
</tr>
))}
</tbody>
</table>
</div>
);
};

export default ProblemList;

