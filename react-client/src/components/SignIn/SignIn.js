import React from 'react';
import propTypes from 'prop-types';
import {connect} from "react-redux";
import * as userActions from '../../services/users';
import * as requestTypes from "../../constants/request.types";

import {Form, Button, Input, Segment} from "semantic-ui-react";
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
        const {cause, isSignedIn, isLoading} = this.props;
        if (isSignedIn) {
            return <Redirect to='/'/>
        }
        return <Segment loading={isLoading}>
            <p>cause: {cause}</p>
            <Form>
                <Input name="email" placeholder="Email" required onChange={this.inputChangeHandler}/>
                <Input name="password" type="password" required onChange={this.inputChangeHandler}/>
                <Button onClick={this.onSignInClick}>
                    Sign in
                </Button>
            </Form>
        </Segment>
    }
}

SignIn.propTypes = {
    auth: propTypes.func.isRequired,
    cause: propTypes.string,
    isLoading: propTypes.bool,
    isSignedIn: propTypes.bool,
};

function mapStateToProps(state) {
    return {
        cause: state.users.get('session').get('cause'),
        isLoading: state.requests.get(requestTypes.AUTH),
        isSignedIn: state.users.get('session').get('isSignedIn'),
    }
}

export default connect(mapStateToProps, userActions)(SignIn)