import React from 'react';
import propTypes from 'prop-types';
import {connect} from "react-redux";
import * as userActions from '../../services/users';
import * as requestTypes from "../../constants/request.types";

import {Button, Input, Segment, Grid, Divider} from "semantic-ui-react";
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
        const {email, password} = this.state;
        const hasInput = email && password;

        return <Segment loading={isLoading} textAlign='center' vertical piled placeholder>
            <Grid columns={2}>
                <Grid.Column>
                    <p style={{color: 'red'}}>{cause}</p>
                    <div>
                        <Input onChange={this.inputChangeHandler} size='large'
                               icon='user' name='email' placeholder='Email'
                               label="ایمیل"
                        /><br/><br/>
                        <Input onChange={this.inputChangeHandler} size='large'
                               icon='lock' name='password' type='password'
                               placeholder='Password'
                               label="گذرواژه"
                        /><br/><br/>
                        <Button onClick={this.onSignInClick} disabled={!hasInput}
                                primary
                                content="ورود"
                        /><br/>
                    </div>
                </Grid.Column>
                <Grid.Column>
                    <Button content='بازنشانی گذرواژه' icon='refresh' size='small'/>
                    <br/>
                    <Button content='ثبت نام' icon='signup' size='small'/>
                </Grid.Column>
            </Grid>

            <Divider vertical>Or</Divider>

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