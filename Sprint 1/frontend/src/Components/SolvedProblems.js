import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ResolvedProblemList = () => {
  const [resolvedProblems, setResolvedProblems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.post('http://localhost:4000/guest/resolved-problems');
      setResolvedProblems(result.data);
    };
    fetchData();
  }, []);

  return (
    <div className="resolved-problem-list">
      <h2>Resolved Problems</h2>
      <table>
        <thead>
          <tr>
            <th>Problem</th>
            <th>Course Name</th>
          </tr>
        </thead>
        <tbody>
          {resolvedProblems.map((problem) => (
            <tr key={problem._id}>
              <td>{problem.Problem}</td>
              <td>{problem.CourseName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResolvedProblemList;
