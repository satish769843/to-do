import axios from 'axios';
import {
  ADD_TODO,
  TODO_ERROR,
  GET_TODO,
  GET_TODO_ERROR,
  DELETE_TODO,
  DELETE_TODO_ERROR,
  GET_TODO_ID,
  EDIT_TODO,
  EDIT_TODO_ERROR,
} from './types';

// GET ALL TODO

export const getTodo = () => async dispatch => {
  try {
    const res = await axios.get('/api/todo/');
    dispatch({
      type: GET_TODO,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TODO_ERROR,
    });
  }
};

// ADD TODO
export const addTodo = (todo, date, status) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ todo, date, status });
  try {
    const res = await axios.post('/api/todo/', body, config);
    dispatch({
      type: ADD_TODO,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_TODO_ERROR,
    });
  }
};

// DELETE TODO

export const deleteTodo = id => async dispatch => {
  try {
    await axios.delete(`/api/todo/${id}`);
    dispatch({
      type: DELETE_TODO,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: DELETE_TODO_ERROR,
    });
  }
};
// GET TODO BY ID
export const getTodoId = id => async dispatch => {
  try {
    const res = await axios.get(`/api/todo/${id}`);
    dispatch({
      type: GET_TODO_ID,
      payload: res.data,
    });
  } catch (err) {}
};

//  EDIT TODO
export const editTodo = (todo, date, status, editID) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ editID, todo, status, date });

  try {
    const res = await axios.put(`/api/todo/${editID}`, body, config);
    dispatch({
      type: EDIT_TODO,
      payload: res.data,
    });
    getTodo();
  } catch (err) {
    dispatch({
      type: EDIT_TODO_ERROR,
    });
  }
};
