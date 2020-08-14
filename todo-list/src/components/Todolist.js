import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
// Page
import Navbar from './Navbar';
import TodoForm from './TodoForm';
// Action
import { getTodo, deleteTodo, editTodo } from '../action/todo';
// Redux
import { connect } from 'react-redux';
//

const Todolist = ({ getTodo, deleteTodo, todoList, editTodo }) => {
  const [editID, seteditID] = useState(0);
  const onDelete = (e, id) => {
    e.preventDefault();
    deleteTodo(id);
  };

  const onStatusChange = (e, todo) => {
    const status = (todo.status = !todo.status);
    console.log(status);
    editTodo(todo.todo, todo.date, status, todo._id);
  };

  const TodoData = todoList.map(todo => (
    <tr key={todo._id}>
      <td scope='row'>{todo.todo}</td>
      <td>
        <Moment format='DD/MM/YYYY'>{todo.date}</Moment>
      </td>
      <td scope='row'>
        <input
          type='checkbox'
          defaultChecked={todo.status}
          onChange={e => onStatusChange(e, todo)}
          data-toggle='toggle'
        />
      </td>
      <td scope='row'>
        <i
          onClick={e => seteditID(todo._id)}
          className='fas fa-edit text-success fa-lg mr-1'
          data-toggle='modal'
          data-target='#myModal'
          style={{ cursor: 'pointer' }}
        ></i>

        <i
          className='fas fa-trash text-danger fa-lg '
          style={{ cursor: 'pointer' }}
          onClick={e => onDelete(e, todo._id)}
        ></i>
      </td>
    </tr>
  ));

  // const onEdit = (e, id) => {
  //   e.preventDefault();
  //   seteditID({ id });
  //   // console.log(id);
  // };

  useEffect(() => {
    getTodo();
  }, [getTodo]);

  return (
    <Fragment>
      <Navbar />
      <div className='mt-2'>
        <TodoForm {...{ editID, seteditID }} />
        <div className='col-6 ml-auto mr-auto mt-2'>
          <table className='table'>
            <thead className='thead-dark'>
              <tr>
                <th scope='col'>List</th>
                <th scope='col'>Date</th>
                <th scope='col'>Status</th>
                <th scope='col'>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* Todo Table */}
              {TodoData}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};

Todolist.protoType = {
  getTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  todoList: PropTypes.object.isRequired,
  editTodo: PropTypes.func.isRequired,
};
const map = state => ({
  todoList: state.todo.todoList,
});

export default connect(map, { getTodo, deleteTodo, editTodo })(Todolist);
