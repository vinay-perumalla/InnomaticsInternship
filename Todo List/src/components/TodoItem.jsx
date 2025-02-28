import React, { useState, useRef, useEffect } from 'react';
import { CheckCircle, Circle, Trash2, Edit, Save, X, ArrowUp, ArrowDown, Clock } from 'lucide-react';

const TodoItem = ({
  todo,
  onToggle,
  onDelete,
  onEdit,
  onPriorityChange,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const getPriorityColor = () => {
    switch (todo.priority) {
      case 'high':
        return 'bg-red-100 border-red-300';
      case 'medium':
        return 'bg-yellow-100 border-yellow-300';
      case 'low':
        return 'bg-green-100 border-green-300';
      default:
        return 'bg-gray-100 border-gray-300';
    }
  };

  const getNextPriority = () => {
    switch (todo.priority) {
      case 'low':
        return 'medium';
      case 'medium':
        return 'high';
      case 'high':
        return 'low';
      default:
        return 'low';
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div
      className={`group p-4 mb-3 rounded-lg border shadow-sm transition-all duration-200 hover:shadow-md ${getPriorityColor()}`}
    >
      <div className="flex items-center">
        <button
          onClick={() => onToggle(todo.id)}
          className="mr-3 text-gray-500 hover:text-blue-500 transition-colors"
          aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {todo.completed ? (
            <CheckCircle className="h-6 w-6 text-blue-500" />
          ) : (
            <Circle className="h-6 w-6" />
          )}
        </button>

        {isEditing ? (
          <div className="flex-grow flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-grow p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              autoFocus
            />
            <button
              onClick={handleSave}
              className="ml-2 p-1 text-green-600 hover:text-green-800"
              aria-label="Save"
            >
              <Save size={18} />
            </button>
            <button
              onClick={handleCancel}
              className="ml-1 p-1 text-red-600 hover:text-red-800"
              aria-label="Cancel"
            >
              <X size={18} />
            </button>
          </div>
        ) : (
          <div className="flex-grow flex flex-col">
            <span className={`text-lg ${todo.completed ? 'completed-task' : ''}`}>
              {todo.text}
            </span>
            <div className="flex items-center text-xs text-gray-500 mt-1">
              <Clock size={12} className="mr-1" />
              <span>{formatDate(todo.createdAt)}</span>
            </div>
          </div>
        )}

        {!isEditing && (
          <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onPriorityChange(todo.id, getNextPriority())}
              className="ml-1 p-1 text-gray-600 hover:text-gray-800"
              aria-label="Change priority"
            >
              {todo.priority === 'high' ? (
                <ArrowUp size={18} className="text-red-500" />
              ) : todo.priority === 'medium' ? (
                <ArrowUp size={18} className="text-yellow-500" />
              ) : (
                <ArrowDown size={18} className="text-green-500" />
              )}
            </button>
            <button
              onClick={handleEdit}
              className="ml-1 p-1 text-gray-600 hover:text-blue-600"
              aria-label="Edit"
            >
              <Edit size={18} />
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="ml-1 p-1 text-gray-600 hover:text-red-600"
              aria-label="Delete"
            >
              <Trash2 size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoItem;