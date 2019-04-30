import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import Dashboard from './components/Dashboard';
import './App.css';
import SignIn from "./components/SignIn";
import {authSuccess} from "./actions/users";

class App extends React.Component {

    componentDidMount() {
        const data = JSON.parse(localStorage.getItem('auth'));
        if (data && data.user && data.user.uuid && data.token) {
            console.log('previous session recovery');
            this.props.dispatch(authSuccess(data));
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

function mapStateToProps(state) {
    return {
        session: state.users.get('session')
    }
}

export default connect(mapStateToProps)(App);
