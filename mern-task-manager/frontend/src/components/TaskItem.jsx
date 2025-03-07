// frontend/src/components/TaskItem.js
import React from 'react';
import { Link } from 'react-router-dom';

const TaskItem = ({ task }) => {
  return (
    <li className="bg-gray-100 p-4 mb-2 rounded flex justify-between items-center">
      <div>
        <h3 className="text-xl font-semibold">{task.title}</h3>
        <p>{task.description}</p>
        <p className={`status ${task.status === 'completed' ? 'text-green-500' : task.status === 'in progress' ? 'text-yellow-500' : 'text-red-500'}`}>
          {task.status}
        </p>
        <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
      </div>
      <div>
        <Link to={`/edit/${task._id}`} className="text-blue-500">Edit</Link>
      </div>
    </li>
  );
};

export default TaskItem;
