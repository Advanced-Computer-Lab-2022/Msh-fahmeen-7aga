import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Notifications = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.post('http://localhost:4000/guest/notifications', { /* request body */ });
      setRequests(result.data);
    };
    fetchData();
  }, []);
  

  const handleApprove = async (courseId, email) => {
    await axios.post('http://localhost:4000/guest/grant-access/' + courseId, { email });
    const updatedRequests = requests.filter(request => request.courseId !== courseId || request.email !== email);
    setRequests(updatedRequests);
  };

  const handleReject = async (courseId, email) => {
    await axios.post('http://localhost:4000/guest/reject-access/' + courseId, { email });
    const updatedRequests = requests.filter(request => request.courseId !== courseId || request.email !== email);
    setRequests(updatedRequests);
  };

  return (
    <div>
      {requests.map(request => (
        <div key={request.courseId}>
          <p>Trainee {request.email} has requested access to course {request.courseId}</p>
          <button onClick={() => handleApprove(request.courseId, request.email)}>Approve</button>
          <button onClick={() => handleReject(request.courseId, request.email)}>Reject</button>
        </div>
      ))}
    </div>
  );
};

export default Notifications;
