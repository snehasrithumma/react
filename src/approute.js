import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './features/protectedRoute';
import Login from './features/login';
import { useAuth } from './Context/authContext';
import Wordle from './wordle/app';
import Sudoku from './sudoku/app';
import Snake from './snake/snake';
import ReduxTodo from './TODOApp/todo_redux';
import ReducerTodo from './TODOApp/todo_reducer';
import { CounterReducer, CounterRedux, Messenger} from './features'

const Home = lazy(() => import('./features/homepage'));
const LazyLoading = lazy(() => import('./features/lazyloading/app'));
const Counter = lazy(() => import('./features/customHook/counter'));
const DataFetch = lazy(() => import('./features/customHook/datafetch'));
const Timer = lazy(() => import('./features/timer'));
const Mortgage = lazy(() => import('./features/mortgagecalculator'));
const AutoComplete = lazy(() => import('./Components/autoComplete'));
const TODO = lazy(() => import('./Practice/todo'))
const Comments = lazy(() => import('./features/useMemo/app'));

const buttonStyle = {
    margin: ' 10px',
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    height: '40px',
    padding: '0 15px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
    fontSize: '16px',
    fontWeight: 'bold',
    float: 'right'
};

export default function AppRoute() {
    const { isLoggedIn, logout } = useAuth()
  
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div>{isLoggedIn && <button style={buttonStyle} onClick={logout}>Log Out</button>}</div>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<ProtectedRoute element={<Home />} />} />
                    <Route path="/reducer" element={<ProtectedRoute element={<CounterReducer />} />} />
                    <Route path="/messenger" element={<ProtectedRoute element={<Messenger />} />} />
                    <Route path="/redux" element={<ProtectedRoute element={<CounterRedux />} />} />
                    <Route path="/lazy" element={<ProtectedRoute element={<LazyLoading />} />} />
                    <Route path="/counter" element={<ProtectedRoute element={<Counter />} />} />
                    <Route path="/data" element={<ProtectedRoute element={<DataFetch />} />} />
                    <Route path="/timer" element={<ProtectedRoute element={<Timer />} />} />
                    <Route path="/calculator" element={<ProtectedRoute element={<Mortgage />} />} />
                    <Route path="/autoComplete" element={<ProtectedRoute element={<AutoComplete />} />} />
                    <Route path="/wordle" element={<ProtectedRoute element={<Wordle />} />} />
                    <Route path="/sudoku" element={<ProtectedRoute element={<Sudoku />} />} />
                    <Route path="/snake" element={<ProtectedRoute element={<Snake />} />} />
                    <Route path="/withredux" element={<ProtectedRoute element={<ReduxTodo />} />} />
                    <Route path="/withreducer" element={<ProtectedRoute element={<ReducerTodo />} />} />
                    <Route path="/practice" element={<ProtectedRoute element={<TODO />} />} />
                    <Route path="/comments" element={<Comments />} />

                </Routes>
            </Suspense>
        </div>
    );
}