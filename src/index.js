import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import Home from './layout/home/home'
import HelloPage from './layout/hellopage'
import Critics from './layout/critics/Critics'
import Default from './layout/default-page/Default'

ReactDOM.render(
    <BrowserRouter>
        <App>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/hellopage" component={HelloPage} />
                <Route path="/critics" component={Critics} />
                <Route component={Default} />
            </Switch>
        </App>
    </BrowserRouter>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
