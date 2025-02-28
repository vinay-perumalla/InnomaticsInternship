// In JavaScript, you don't define interfaces like in TypeScript.
// If you want to represent the structure of a Todo object,
// you can use a plain JavaScript object or a class.

// Example using a plain JavaScript object (for documentation purposes):

/**
 * @typedef {object} Todo
 * @property {string} id - The unique identifier of the todo.
 * @property {string} text - The text of the todo.
 * @property {boolean} completed - Indicates if the todo is completed.
 * @property {Date} createdAt - The creation date of the todo.
 * @property {'low' | 'medium' | 'high'} priority - The priority of the todo.
 */

// Example usage:

// const myTodo = {
//   id: '123',
//   text: 'Buy groceries',
//   completed: false,
//   createdAt: new Date(),
//   priority: 'medium',
// };