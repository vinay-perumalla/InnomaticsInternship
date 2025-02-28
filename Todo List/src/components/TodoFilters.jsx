import React from 'react';
import { Filter, CheckCircle, Circle, ArrowUpDown } from 'lucide-react';

const TodoFilters = ({ filter, setFilter, sortBy, setSortBy }) => {
  return (
    <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center">
        <Filter size={16} className="text-gray-500 mr-2" />
        <span className="text-sm font-medium text-gray-700 mr-2">Filter:</span>
        <div className="flex space-x-1">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 text-xs rounded-full transition-colors ${
              filter === 'all'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-3 py-1 text-xs rounded-full transition-colors ${
              filter === 'active'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-3 py-1 text-xs rounded-full transition-colors ${
              filter === 'completed'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            Completed
          </button>
        </div>
      </div>

      <div className="flex items-center">
        <ArrowUpDown size={16} className="text-gray-500 mr-2" />
        <span className="text-sm font-medium text-gray-700 mr-2">Sort by:</span>
        <div className="flex space-x-1">
          <button
            onClick={() => setSortBy('date')}
            className={`px-3 py-1 text-xs rounded-full transition-colors ${
              sortBy === 'date'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            Date
          </button>
          <button
            onClick={() => setSortBy('priority')}
            className={`px-3 py-1 text-xs rounded-full transition-colors ${
              sortBy === 'priority'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            Priority
          </button>
          <button
            onClick={() => setSortBy('alphabetical')}
            className={`px-3 py-1 text-xs rounded-full transition-colors ${
              sortBy === 'alphabetical'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            A-Z
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoFilters;