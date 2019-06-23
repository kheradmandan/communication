import React from 'react';
import propTypes from 'prop-types';
import {Form, Button, TextArea} from "semantic-ui-react";
import Ability from "../../Ability";
import Selection from "../../Selection";

export default class AddComment extends React.Component {

    state = {
        context: '',
        assigneeId: '',
    };

    handleTextChange = (e, {value}) => {
        this.setState({context: value});
    };

    handleUserChange = userId => {
        this.setState({assigneeId: userId});
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const {context, assigneeId} = this.state;
        const {issue, onAddComment, onChangeAssignee} = this.props;

        if (context && context.length > 0) {
            onAddComment(issue.get('_id'), context)
        }

        if (assigneeId) {
            onChangeAssignee(assigneeId);
        }
    };

    render() {
        const {context, assigneeId} = this.state;
        const {issue} = this.props;

        return <Form>
            <TextArea value={context} onChange={this.handleTextChange}/>
            <Ability can='change-issue-assignee' permissions={issue.get('permissions')}>
                <Selection.User onChange={this.handleUserChange}/>
            </Ability>
            <Button primary icon='save' disabled={!context && !assigneeId} onClick={this.handleSubmit}>
                ثبت
            </Button>
        </Form>
    }
}

AddComment.propTypes = {
    onAddComment: propTypes.func.isRequired,
    onChangeAssignee: propTypes.func.isRequired,
    issue: propTypes.object.isRequired,
};