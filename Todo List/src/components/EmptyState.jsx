import React from 'react';
import { ClipboardList } from 'lucide-react';

const EmptyState = ({ filter }) => {
  let message = '';

  switch (filter) {
    case 'all':
      message = "You don't have any tasks yet. Add your first task to get started!";
      break;
    case 'active':
      message = "You don't have any active tasks. Great job!";
      break;
    case 'completed':
      message = "You haven't completed any tasks yet. Keep going!";
      break;
    default:
      message = "No tasks found.";
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
      <ClipboardList className="h-16 w-16 text-gray-400 mb-4" />
      <h3 className="text-lg font-medium text-gray-700 mb-2">No tasks found</h3>
      <p className="text-gray-500 text-center max-w-sm">{message}</p>
    </div>
  );
};

export default EmptyState;