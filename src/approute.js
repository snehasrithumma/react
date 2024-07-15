import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import CounterRedux from './features/CounterRedux/Counter'
import Messenger from './features/messenger/messenger'
import Home from './features/homepage'
import CounterReducer from './features/CounterReducer/reducer'


export default function AppRoute(props) {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/reducer" element={<CounterReducer />} ></Route>
                <Route path="/redux" element={<CounterRedux />} ></Route>
                <Route path="/messenger" element={<Messenger />} ></Route>
            </Routes>
        </BrowserRouter>
    );
}