import React from 'react';
import { CheckCircle, Circle, Clock, AlertTriangle } from 'lucide-react';

const TodoStats = ({ todos }) => {
  const total = todos.length;
  const completed = todos.filter((todo) => todo.completed).length;
  const active = total - completed;
  const highPriority = todos.filter(
    (todo) => todo.priority === 'high' && !todo.completed
  ).length;

  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center">
        <div className="bg-blue-100 p-3 rounded-full mr-4">
          <Clock className="h-6 w-6 text-blue-500" />
        </div>
        <div>
          <p className="text-sm text-gray-500">Total Tasks</p>
          <p className="text-xl font-semibold">{total}</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center">
        <div className="bg-green-100 p-3 rounded-full mr-4">
          <CheckCircle className="h-6 w-6 text-green-500" />
        </div>
        <div>
          <p className="text-sm text-gray-500">Completed</p>
          <p className="text-xl font-semibold">{completed}</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center">
        <div className="bg-purple-100 p-3 rounded-full mr-4">
          <Circle className="h-6 w-6 text-purple-500" />
        </div>
        <div>
          <p className="text-sm text-gray-500">Active</p>
          <p className="text-xl font-semibold">{active}</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center">
        <div className="bg-red-100 p-3 rounded-full mr-4">
          <AlertTriangle className="h-6 w-6 text-red-500" />
        </div>
        <div>
          <p className="text-sm text-gray-500">High Priority</p>
          <p className="text-xl font-semibold">{highPriority}</p>
        </div>
      </div>
    </div>
  );
};

export default TodoStats;