import {
  ADD_TODO,
  GET_TODO,
  GET_TODO_ERROR,
  DELETE_TODO,
  DELETE_TODO_ERROR,
  GET_TODO_ID,
  EDIT_TODO,
  EDIT_TODO_ERROR,
} from '../action/types';
const initialState = {
  addTodo: null,
  todoList: [],
  getTodo: null,
  loading: true,
  error: {},
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_TODO:
      return {
        ...state,
        addTodo: payload,
        loading: false,
      };
    case EDIT_TODO:
      return {
        ...state,
        todoList: state.todoList.map(x =>
          x._id === action.payload._id ? action.payload : x
        ),
      };
    case GET_TODO:
      return {
        ...state,
        todoList: payload,
        loading: false,
      };
    case GET_TODO_ID:
      return {
        ...state,
        getTodo: payload,
        loading: false,
      };
    case DELETE_TODO:
      return {
        ...state,
        todoList: state.todoList.filter(todo => todo._id !== payload),
      };
    case GET_TODO_ERROR:
    case DELETE_TODO_ERROR:
    case EDIT_TODO_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};
