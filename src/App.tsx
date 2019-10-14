import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

//Types
interface Todo {
  id: number;
  description: string;
  completed: boolean;
}

interface State {
  todos: Array<Todo>;
  newTodoDescription: string;
}

class Todo implements Todo {
  constructor(description: string) {
    this.description = description;
    this.completed = false;
    this.id = Math.floor(Math.random() * Math.floor(1000));
  }
}

const inputClassName = `shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mx-6`;

//const fakeTodos = [new Todo('clean house'), new Todo('do laundry')]

const App: React.FC = () => {
  const [state, setState] = useState<State>({
    todos: [],
    newTodoDescription: ''
  });
  return (
    <div className='app flex justify-center items-center flex-col'>
      <div className='flex justify-center items-center my-8'>
        <input
          className={inputClassName}
          value={state.newTodoDescription}
          onChange={e => {
            setState({ ...state, newTodoDescription: e.target.value });
          }}
        />
        <button
          onClick={() => {
            //Create new instance of Todo with the newTodoDescription in state
            const todo = new Todo(state.newTodoDescription);
            //Update todos by inserting the new todo using setState.
            setState({
              ...state,
              todos: state.todos.concat(todo),
              newTodoDescription: ''
            });
          }}
          className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
        >
          Create
        </button>
      </div>
      <table className='table-auto'>
        <thead>
          <tr>
            <th className='px-4 py-2'>Id</th>
            <th className='px-4 py-2'>Description</th>
            <th className='px-4 py-2'>Completed</th>
          </tr>
        </thead>
        <tbody>
          {state.todos.map((todo: Todo) => (
            <tr>
              <td className='border px-4 py-2'>{todo.id}</td>
              <td className='border px-4 py-2'>{todo.description}</td>
              <td className='border px-4 py-2'>
                {todo.completed ? 'complete' : 'incomplete'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
