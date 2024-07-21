import React, { Suspense, lazy } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
// import CounterRedux from './features/CounterRedux/Counter'
// import Messenger from './features/messenger/messenger'
// import Home from './features/homepage'
// import CounterReducer from './features/CounterReducer/reducer'

const Home = lazy(() => import('./features/homepage'));
const CounterReducer = lazy(() => import('./features/CounterReducer/reducer'));
const Messenger = lazy(() => import('./features/messenger/messenger'));
const CounterRedux = lazy(() => import('./features/CounterRedux/Counter'));
const LazyLoading = lazy(() => import('./features/lazyloading/app'));
const Custom = lazy(() => import('./features/customHook/form'));


export default function AppRoute(props) {
    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/" exact element={<Home />} />
                    <Route path="/reducer" element={<CounterReducer />} />
                    <Route path="/messenger" element={<Messenger />} />
                    <Route path="/redux" element={<CounterRedux />} />
                    <Route path="/lazy" element={<LazyLoading />} />
                    <Route path="/custom" element={<Custom />} />
                </Routes>
            </Suspense>
            {/* <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/reducer" element={<CounterReducer />} ></Route>
                <Route path="/redux" element={<CounterRedux />} ></Route>
                <Route path="/messenger" element={<Messenger />} ></Route>
            </Routes> */}
        </Router>
    );
}