import React from 'react';
import TodoItem from './TodoItem';
import EmptyState from './EmptyState';

const TodoList = ({
  todos,
  filter,
  onToggle,
  onDelete,
  onEdit,
  onPriorityChange,
}) => {
  // Filter todos based on the selected filter
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true; // 'all' filter
  });

  if (filteredTodos.length === 0) {
    return <EmptyState filter={filter} />;
  }

  return (
    <div className="space-y-2">
      {filteredTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
          onPriorityChange={onPriorityChange}
        />
      ))}
    </div>
  );
};

export default TodoList;