import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import propTypes from 'prop-types';
import Dashboard from './components/Dashboard';
import './App.css';
import SignIn from "./components/SignIn";
import {authSuccess} from "./actions/users";
import * as permissionActions from './actions/permissions';
import API from './utils/API';

class App extends React.Component {

    componentDidMount() {
        const data = JSON.parse(localStorage.getItem('auth'));
        if (data && data.user && data.user.uuid && data.token) {
            console.log('previous session recovery');
            this.props.dispatch(authSuccess(data));
            API.defaults.headers['authorization'] = data.type + ' ' + data.token;
        }
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

export default connect(mapStateToProps)(App);
