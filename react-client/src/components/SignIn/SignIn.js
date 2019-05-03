import React from 'react';
import propTypes from 'prop-types';
import {connect} from "react-redux";
import * as userActions from '../../actions/users';

import {Form, Button, Input} from "semantic-ui-react";
import {Redirect} from "react-router";

class SignIn extends React.Component {
    state = {email: '', password: ''};

    inputChangeHandler = ({target: {name, value}}) => {
        this.setState({[name]: value});
    };

    onSignInClick = (e) => {
        e.preventDefault();
        const {email, password} = this.state;
        this.props.auth(email, password);
    };

    render() {
        const {session, isLoading} = this.props;
        const isRegistered = session && session.getIn(['user', 'uuid']);
        if (isRegistered) {
            return <Redirect to='/'/>
        }
        return <div>
            <p>cause: {session.cause}</p>
            <Form>
                <Input name="email" placeholder="Email" onChange={this.inputChangeHandler}/>
                <Input name="password" type="password" onChange={this.inputChangeHandler}/>
                <Button isLoading={isLoading} onClick={this.onSignInClick}>
                    Sign in
                </Button>
            </Form>
        </div>
    }
}

SignIn.propTypes = {
    auth: propTypes.func.isRequired,
    session: propTypes.object,
    isLoading: propTypes.bool,
};


function mapStateToProps(state) {
    return {
        session: state.users.get('session')
    }
}

export default connect(mapStateToProps, userActions)(SignIn)