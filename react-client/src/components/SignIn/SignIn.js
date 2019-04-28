import React from 'react';
import proptTypes from 'prop-types';
import {connect} from "react-redux";
import * as userActions from '../../actions/users';

import {Form, Button, Input, Icon, Label} from "semantic-ui-react";

class SignIn extends React.Component {

    render() {
        const {auth, session} = this.props;

        return <div>
            <p>cause: {session.cause}</p>
            <Form>
                <Input name="email" placeholder="Email"/>
                <Input name="password" type="password"/>
                <Button onClick={auth}>
                    Sign in
                </Button>
            </Form>
        </div>
    }
}

function mapStateToProps(state) {
    return {
        session: state.users.get('session')
    }
}

export default connect(mapStateToProps, userActions)(SignIn)