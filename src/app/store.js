import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/CounterRedux/counterslice';
import todoReducer from '../TODOApp/todoReducer';

export default configureStore({
  reducer: {
    counter: counterReducer,
    TODO: todoReducer,
  }
})