// frontend/src/components/TaskList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TaskItem from './TaskItem';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('/api/tasks')
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the tasks!', error);
      });
  }, []);

  return (
    <div>
      <Link to="/add" className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">
        Add Task
      </Link>
      <div>
        {tasks.length === 0 ? (
          <p>No tasks available.</p>
        ) : (
          <ul>
            {tasks.map((task) => (
              <TaskItem key={task._id} task={task} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TaskList;
