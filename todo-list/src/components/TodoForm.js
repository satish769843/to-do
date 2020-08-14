import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

// Pages
// Action
import { addTodo, getTodo, editTodo } from '../action/todo';
// Redux
import { connect } from 'react-redux';
//
const TodoForm = ({
  getTodoList: { todoList, loading },
  addTodo,
  editID,
  seteditID,
  getTodo,
  editTodo,
}) => {
  const [formData, setformData] = useState({
    todo: '',
    date: '',
    status: true,
  });

  const { todo, date, status } = formData;

  // console.log(editData);
  const onChange = e => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (editID === 0) {
      addTodo(todo, date);
    } else {
      editTodo(todo, date, status, editID);
      seteditID(0);
    }
    getTodo();
    setformData({ todo: '', date: '' });
  };

  useEffect(() => {
    if (editID !== 0) {
      const editData = todoList.find(x => x._id === editID);
      setformData({
        todo: loading || !editData.todo ? '' : editData.todo,
        date: loading || !editData.date ? '' : editData.date,
      });
    }
  }, [editID]);
  // const at = moment();
  console.log(date);
  // console.log(at.format('DD/MM/YYYY'));
  return (
    <div className='col-6 ml-auto mr-auto mt-2'>
      <button
        type='button'
        className='btn btn-primary btn-lg'
        data-toggle='modal'
        data-target='#myModal'
      >
        ADD TODO
      </button>
      <div className='modal fade' id='myModal' role='dialog'>
        <form>
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header bg-primary'>
                <h4 className='modal-title text-white'>
                  {editID.length > 0 ? 'UPDATE TODO' : 'ADD TODO'}
                </h4>
                <button type='button' className='close' data-dismiss='modal'>
                  &times;
                </button>
              </div>
              <div className='modal-body'>
                <div className='form-group'>
                  <label htmlFor='todo'>Enter Todo</label>
                  <div className='form-group'>
                    <input
                      type='text'
                      name='todo'
                      value={todo}
                      onChange={e => onChange(e)}
                      className='form-control'
                    />
                  </div>
                  <div className='form-group'>
                    <input
                      type='date'
                      name='date'
                      Value={date}
                      onChange={e => onChange(e)}
                      className='form-control'
                    />
                  </div>
                </div>
              </div>
              <div className='modal-footer justify-content-center'>
                <button
                  type='submit'
                  className='btn btn-primary  btn-lg '
                  onClick={e => onSubmit(e)}
                  data-dismiss='modal'
                >
                  {editID.length > 0 ? 'Save Changes' : ' Add Todo'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

TodoForm.protoType = {
  addTodo: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  getTodoList: state.todo,
});
export default connect(mapStateToProps, { addTodo, getTodo, editTodo })(
  TodoForm
);
