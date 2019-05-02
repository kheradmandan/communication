import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import {Provider} from 'react-redux';
import applicationStore from './stores/application';
import * as serviceWorker from './serviceWorker';
import App from './App';

import 'semantic-ui-css/semantic.min.css'
import './index.css';

const store = applicationStore();

function main(Component) {
    ReactDOM.render(
        <Provider store={store}>
            <BrowserRouter>
                <Component/>
            </BrowserRouter>
        </Provider>
        , document.getElementById('root'));
}

main(App);
// main(SignIn);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
