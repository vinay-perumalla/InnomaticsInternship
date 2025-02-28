import React, { useState, useEffect } from 'react';
import { CheckSquare } from 'lucide-react';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import TodoFilters from './components/TodoFilters';
import TodoStats from './components/TodoStats';

function App() {
  // Load todos from localStorage on initial render
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      try {
        // Parse the saved todos and ensure dates are properly converted back to Date objects
        return JSON.parse(savedTodos, (key, value) => {
          if (key === 'createdAt') return new Date(value);
          return value;
        });
      } catch (error) {
        console.error('Error parsing saved todos:', error);
        return [];
      }
    }
    return [];
  });

  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [showConfetti, setShowConfetti] = useState(false);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Add a new todo
  const addTodo = (text, priority) => {
    const newTodo = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: new Date(),
      priority,
    };
    setTodos([...todos, newTodo]);
  };

  // Toggle a todo's completed status
  const toggleTodo = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        const newCompleted = !todo.completed;

        // Show confetti when completing a task
        if (newCompleted) {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 2000);
        }

        return { ...todo, completed: newCompleted };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  // Delete a todo
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Edit a todo
  const editTodo = (id, newText) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
  };

  // Change a todo's priority
  const changePriority = (id, priority) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, priority } : todo))
    );
  };

  // Sort todos based on the selected sort option
  const sortedTodos = [...todos].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (sortBy === 'priority') {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    } else if (sortBy === 'alphabetical') {
      return a.text.localeCompare(b.text);
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <header className="mb-8 text-center">
          <div className="flex items-center justify-center mb-2">
            <CheckSquare className="h-8 w-8 text-blue-500 mr-2" />
            <h1 className="text-3xl font-bold text-gray-800">TaskMaster</h1>
          </div>
          <p className="text-gray-600">Organize your tasks efficiently</p>
        </header>

        <TodoStats todos={sortedTodos} />

        <AddTodo onAdd={addTodo} />

        <TodoFilters
          filter={filter}
          setFilter={setFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        <TodoList
          todos={sortedTodos}
          filter={filter}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
          onPriorityChange={changePriority}
        />

        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {/* This would be where confetti animation would render */}
            {/* For simplicity, we're just showing a visual indicator */}
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
              <div className="text-6xl animate-bounce">🎉</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;