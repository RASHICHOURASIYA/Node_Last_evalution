// frontend/src/components/Task/TaskCard.js

import React from 'react';

const TaskCard = ({ task }) => {
  return (
    <div>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Status: {task.status}</p>
    </div>
  );
};

export default TaskCard;
