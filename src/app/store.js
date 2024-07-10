import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/CounterRedux/counterslice';

export default configureStore({
  reducer: {
    counter: counterReducer,
  }
})