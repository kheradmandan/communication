import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import propTypes from 'prop-types';
import Dashboard from './components/Dashboard';
import SignIn from "./components/SignIn";
import * as userActions from "./actions/users";

import './App.css';

class App extends React.Component {

    componentDidMount() {
        this.props.loadPrevSession();
    }

    render() {
        const {session} = this.props;
        return (
            <Switch>
                <Route exact path='/signIn' component={SignIn}/>
                {(!session || !session.user || !session.user.uuid) && <Redirect to='/signIn'/>}

                <Route exact path='/' component={Dashboard}/>
                <Redirect to='/'/>
            </Switch>
        );
    }
}

App.propTypes = {
    session: propTypes.object.isRequired,
    loadPrevSession: propTypes.func.isRequired,
    loadXrefUsersOrigins: propTypes.func.isRequired,
    loadXrefOriginsRealms: propTypes.func.isRequired,
    xrefUsersOrigins: propTypes.object,
    xrefOriginsRealms: propTypes.object,
};

function mapStateToProps(state) {
    return {
        session: state.users.get('session'),
        xrefUsersOrigins: state.permissions.get('xref-users-origins'),
        xrefOriginsRealms: state.permissions.get('xref-origins-realms'),
    }
}

export default connect(mapStateToProps, userActions)(App);
