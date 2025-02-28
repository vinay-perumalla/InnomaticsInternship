import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const AddTodo = ({ onAdd }) => {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('medium');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim(), priority);
      setText('');
      setIsExpanded(false);
    }
  };

  return (
    <div className="mb-6">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
        <div className="flex items-center mb-2">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            placeholder="Add a new task..."
            className="flex-grow p-2 border-b-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
          />
          <button
            type="submit"
            disabled={!text.trim()}
            className={`ml-2 p-2 rounded-full ${
              text.trim() ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-300'
            } text-white transition-colors`}
            aria-label="Add task"
          >
            <Plus size={20} />
          </button>
        </div>

        {isExpanded && (
          <div className="flex items-center mt-3 space-x-2 animate-fadeIn">
            <span className="text-sm text-gray-600">Priority:</span>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => setPriority('low')}
                className={`px-3 py-1 text-xs rounded-full ${
                  priority === 'low'
                    ? 'bg-green-500 text-white'
                    : 'bg-green-100 text-green-800 hover:bg-green-200'
                } transition-colors`}
              >
                Low
              </button>
              <button
                type="button"
                onClick={() => setPriority('medium')}
                className={`px-3 py-1 text-xs rounded-full ${
                  priority === 'medium'
                    ? 'bg-yellow-500 text-white'
                    : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                } transition-colors`}
              >
                Medium
              </button>
              <button
                type="button"
                onClick={() => setPriority('high')}
                className={`px-3 py-1 text-xs rounded-full ${
                  priority === 'high'
                    ? 'bg-red-500 text-white'
                    : 'bg-red-100 text-red-800 hover:bg-red-200'
                } transition-colors`}
              >
                High
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default AddTodo;