import React, { useState, useEffect } from 'react';
import TodoList from './Todolist';
import PropTypes from 'prop-types';
import { useParams, useHistory } from 'react-router-dom';
// Pages

// Action
import { editTodo } from '../action/todo';

// Redux
import { connect } from 'react-redux';

const TodoForm = ({ editTodo, getdata: { todoList, loading }, findTodo }) => {
  const history = useHistory();
  const { id } = useParams();
  const [formData, setformData] = useState({
    todo: '',
  });
  // const todoNew = todoList.find(x => x._id === id);

  useEffect(() => {
    if (id !== 0) {
      setformData({
        todo: loading || !todoNew.todo ? '' : todoNew.todo,
      });
    }
  }, [setformData]);

  const { todo } = formData;

  const onChange = e => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    editTodo(todo, id);
    setformData({ todo: '' });
    history.push('/');
  };
  return (
    <div className='col-4 ml-auto mr-auto'>
      {/*  */}
      <div class='modal fade' id='myModal' role='dialog'>
        <form>
          <div class='modal-dialog'>
            <div class='modal-content'>
              <div class='modal-header bg-primary'>
                <h4 class='modal-title text-white'>ADD TODO</h4>
                <button type='button' class='close' data-dismiss='modal'>
                  &times;
                </button>
              </div>
              <div class='modal-body'>
                <div class='form-group'>
                  <label htmlFor='todo'>Enter Todo</label>
                  <input
                    type='text'
                    name='todo'
                    value={todo}
                    onChange={e => onChange(e)}
                    className='form-control mr-2 ml-4'
                  />
                </div>
              </div>

              <div class='modal-footer justify-content-center'>
                <button
                  type='submit'
                  class='btn btn-primary  btn-lg '
                  onClick={e => onSubmit(e)}
                  data-dismiss='modal'
                >
                  UPDATE
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      {/*  */}
      {/* <form
        className='form-inline my-2 mr-auto ml-auto '
        onSubmit={e => onSubmit(e)}
      >
        <label key={id}>Edit Todo</label>
        <input
          type='text'
          name='todo'
          value={todo}
          onChange={e => onChange(e)}
          className='form-control mr-2 ml-4'
        />
        <button className='btn btn-primary'>UPDATE</button>
      </form> */}
      {/* <TodoList /> */}
    </div>
  );
};

TodoForm.protoType = {
  editTodo: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  getdata: state.todo,
});

export default connect(mapStateToProps, {
  editTodo,
})(TodoForm);
