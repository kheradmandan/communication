import React from 'react';
import propTypes from 'prop-types';
import {Form, Button, TextArea} from "semantic-ui-react";

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
        const {issueId, onAddComment} = this.props;

        if (context && context.length > 0) {
            onAddComment(issueId, context)
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

AddComment.propTypes = {
    onAddComment: propTypes.func.isRequired,
    issueId: propTypes.object.isRequired,
};