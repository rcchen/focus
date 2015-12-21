import React = require('react');
import ReactDOM = require('react-dom');

import { createHistory } from 'history';
import { Router, Route, Link, IndexRoute, History } from 'react-router';

import { Login } from './views/login';
import { Register } from './views/register';    

class App extends React.Component<{}, {}> {
    public render() {
        return (
            <div className="focus-app">
                <h1>App</h1>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </div>
        );
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const container = document.createElement("div");
    const history = createHistory();
    container.classList.add("focus-container");
    ReactDOM.render((
        <Router history={history}>
            <Route path="/" component={App} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
        </Router>
    ), container);
    document.body.appendChild(container);
});
