import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

//Types
interface TodoInterface {
  id: number;
  description: string;
  completed: boolean;
}

interface State {
  todos: Array<Todo>;
  newTodoDescription: string;
  todoIdToUpdate: null | number;
  updateTodoDescription: string;
}

class Todo implements TodoInterface {
  id: number;
  description: string;
  completed: boolean;
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
    newTodoDescription: '',
    todoIdToUpdate: null,
    updateTodoDescription: ''
  });
  return (
    <div className='app flex justify-center items-center flex-col'>
      {!state.todoIdToUpdate ? (
        <>
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
                    {todo.completed ? (
                      <span>
                        <div className='complete'>
                          <i className='fas fa-check' />
                        </div>
                      </span>
                    ) : (
                      <span>
                        <div className='incomplete'>
                          <i className='fas fa-times' />
                        </div>
                      </span>
                    )}
                  </td>
                  <td className='border px-4 py-2'>
                    <button
                      onClick={() => {
                        setState({
                          ...state,
                          todos: state.todos.map(td => {
                            //If the id matches then update the todo
                            if (td.id === todo.id) {
                              return { ...td, completed: !td.completed };
                            }
                            return td;
                          })
                        });
                      }}
                      className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
                    >
                      {todo.completed
                        ? 'Mark as incomplete'
                        : 'Mark as complete'}
                    </button>
                  </td>
                  <td className='border px-4 py-2'>
                    <button
                      onClick={() => {
                        // Set editing state to true
                        setState({ ...state, todoIdToUpdate: todo.id });
                      }}
                      className='bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded'
                    >
                      Update
                    </button>
                  </td>
                  <td className='border px-4 py-2'>
                    <button
                      onClick={() => {
                        setState({
                          ...state,
                          todos: state.todos.filter(td => td.id !== todo.id)
                        });
                      }}
                      className='bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded'
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <div className='flex justify-center items-center my-8'>
          <input
            className={inputClassName}
            placeholder={
              state.todos.filter(todo => todo.id === state.todoIdToUpdate)[0]
                .description
            }
            onChange={e => {
              //Set the state of updateTodoDescription equal to the event.target.value
              setState({
                ...state,
                updateTodoDescription: e.target.value
              });
            }}
          />
          <td className='border px-4 py-2'>
            <button
              onClick={() => {
                //Find the todo in state.todos by id and set the description of that todo equal to state.updateTodoDescription
                setState({
                  ...state,
                  todos: state.todos.map(todo => {
                    if (todo.id === state.todoIdToUpdate) {
                      return {
                        ...todo,
                        description: state.updateTodoDescription
                      };
                    }
                    return todo;
                  }),
                  todoIdToUpdate: null,
                  updateTodoDescription: ''
                });
              }}
              className='bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded'
            >
              Save
            </button>
          </td>
          <td className='border px-4 py-2'>
            <button
              onClick={() => {
                // Reset to the original state because we are no longer editing.
                setState({ ...state, todoIdToUpdate: null });
              }}
              className='bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded'
            >
              Cancel
            </button>
          </td>
        </div>
      )}
    </div>
  );
};

export default App;
