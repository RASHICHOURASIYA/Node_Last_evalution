// frontend/src/components/Task/TaskForm.js

import React, { useState } from 'react';
import api from '../../services/api';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/tasks', { title, description, status });
      alert('Task created successfully');
      setTitle('');
      setDescription('');
      setStatus('');
    } catch (error) {
      console.error('Failed to create task');
    }
  };

  return (
    <div>
      <h2>Create Task</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="to do">To Do</option>
          <option value="in progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
};

export default TaskForm;
