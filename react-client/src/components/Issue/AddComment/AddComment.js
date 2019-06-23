import React from 'react';
import propTypes from 'prop-types';
import {Form, Button, TextArea} from "semantic-ui-react";
import Ability from "../../Ability";
import Selection from "../../Selection";

export default class AddComment extends React.Component {

    state = {
        context: '',
    };

    handleTextChange = (e, {value}) => {
        this.setState({context: value});
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const {context} = this.state;
        const {issue, onAddComment} = this.props;

        if (context && context.length > 0) {
            onAddComment(issue.get('_id'), context)
        }
    };

    render() {
        const {context} = this.state;
        const {issue} = this.props;

        return <Form>
            <TextArea value={context} onChange={this.handleTextChange}/>
            <Ability can='change-issue-assignee' permissions={issue.get('permissions')}>
                <Selection.User/>
            </Ability>
            <Button primary icon='save' disabled={!context} onClick={this.handleSubmit}>
                ثبت
            </Button>
        </Form>
    }
}

AddComment.propTypes = {
    onAddComment: propTypes.func.isRequired,
    issue: propTypes.object.isRequired,
};