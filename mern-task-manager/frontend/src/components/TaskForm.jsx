// frontend/src/components/TaskForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const [dueDate, setDueDate] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios.get(`/api/tasks/${id}`)
        .then((response) => {
          const task = response.data;
          setTitle(task.title);
          setDescription(task.description);
          setStatus(task.status);
          setDueDate(task.dueDate);
          setIsEditing(true);
        })
        .catch((error) => {
          console.error('Error fetching task for editing:', error);
        });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const taskData = {
      title,
      description,
      status,
      dueDate,
    };

    if (isEditing) {
      axios.put(`/api/tasks/${id}`, taskData)
        .then(() => {
          navigate('/');
        })
        .catch((error) => {
          console.error('Error updating task:', error);
        });
    } else {
      axios.post('/api/tasks', taskData)
        .then(() => {
          navigate('/');
        })
        .catch((error) => {
          console.error('Error creating task:', error);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">{isEditing ? 'Edit Task' : 'Add Task'}</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        >
          <option value="pending">Pending</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        {isEditing ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
};

export default TaskForm;
