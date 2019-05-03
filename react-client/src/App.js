import React from 'react';
import {Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import propTypes from 'prop-types';
import Dashboard from './components/Dashboard';
import SignIn from "./components/SignIn";
import Issue from "./components/Issue";

import * as userActions from "./actions/users";
import './App.css';

class App extends React.Component {

    componentDidMount() {
        this.props.loadPrevSession();
    }

    render() {
        const {session} = this.props;
        const isRegistered = session && session.getIn(['user', 'uuid']);

        if (isRegistered) {
            return <RegisteredUserRoutes/>
        }
        return <UnregisteredUserRoutes/>
    }
}

App.propTypes = {
    session: propTypes.object.isRequired,
    loadPrevSession: propTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        session: state.users.get('session')
    }
}

export default connect(mapStateToProps, userActions)(App);

function UnregisteredUserRoutes() {
    return <Switch>
        <Route exact path='*' component={SignIn}/>
    </Switch>
}

function RegisteredUserRoutes() {
    return <Switch>
        <Route exact path='/issue/:uuid?' component={Issue}/>
        <Route exact path='/' component={Dashboard}/>
    </Switch>
}