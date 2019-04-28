import {createStore, applyMiddleware, compose} from "redux";
import reduxThunk from 'redux-thunk'
import reduxLogger from 'redux-logger'
import reducers from '../reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function () {
    const store = createStore(
        reducers,
        composeEnhancers(applyMiddleware(reduxLogger, reduxThunk))
    );

    return store;
}