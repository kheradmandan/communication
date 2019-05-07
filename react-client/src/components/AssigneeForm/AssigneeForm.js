import React from 'react';
import propTypes from 'prop-types';
import {Form, Button, TextArea} from "semantic-ui-react";

export default class AssigneeForm extends React.Component {

    state = {
        context: '',
    };

    handleTextChange = (e, {value}) => {
        this.setState({context: value});
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const {context} = this.state;
        const {onAddComment, assignee} = this.props;
        const assigneeUuid = assignee.get('uuid');

        if (context && context.length > 0 && onAddComment && assigneeUuid) {
            onAddComment(assigneeUuid, context)
        }
    };

    render() {
        const {context} = this.state;

        return <Form>
            <TextArea value={context} onChange={this.handleTextChange}/>
            <Button primary icon='save' disabled={!context} onClick={this.handleSubmit}>
                ثبت
            </Button>
        </Form>
    }
}

AssigneeForm.propTypes = {
    onAddComment: propTypes.func.isRequired,
    assignee: propTypes.object.isRequired,
};