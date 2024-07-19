// frontend/src/pages/Dashboard.js

import React from 'react';
import TaskList from '../components/Task/TaskList';
import TaskForm from '../components/Task/TaskForm';

const Dashboard = () => {
  return (
    <div>
      <h2>Dashboard</h2>
      <TaskForm />
      <TaskList />
    </div>
  );
};

export default Dashboard;
