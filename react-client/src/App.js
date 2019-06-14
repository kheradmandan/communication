import React from 'react';
import {Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import propTypes from 'prop-types';
import Dashboard from './components/Dashboard';
import SignIn from "./components/SignIn";
import Issue from "./components/Issue";

import * as userActions from "./services/users";
import './App.css';
import MenuBar from "./components/MenuBar/MenuBar";

class App extends React.Component {
    componentDidMount() {
        this.props.loadPrevSession();
    }

    render() {
        const {isSignedIn} = this.props;
        if (isSignedIn) {
            return (<div>
                <MenuBar/>
                <Switch>
                    <Route path='/issue/:id?' component={Issue}/>
                    <Route exact path='/' component={Dashboard}/>
                </Switch>
            </div>)
        }
        return (
            <Switch>
                <Route exact path='*' component={SignIn}/>
            </Switch>)
    }
}

App.propTypes = {
    signInUser: propTypes.bool,
    isSignedIn: propTypes.bool,
    loadPrevSession: propTypes.func.isRequired,
};

App.defaultProps = {
    isSignedIn: false,
};

function mapStateToProps(state) {
    return {
        signInUser: state.users.get('session').get('user'),
        isSignedIn: state.users.get('session').get('isSignedIn'),
    }
}

export default connect(mapStateToProps, userActions)(App);