import React from 'react';
import {Map} from 'immutable';
import propTypes from 'prop-types';
import Ability from '../../Ability';
import ChangeAssignee from '../ChangeAssignee';
import {
    Form,
    Button,
    TextArea,
} from 'semantic-ui-react';


export default class AddComment extends React.Component {

    state = {
        context: '',
        assignee: {user: '', title: 'ارجاع'},
        isContextValid: false,
        isAssigneeValid: false,
    };

    handleTextChange = (e, {value}) => {
        const isContextValid = (value && value.length >= 3);
        this.setState({context: value, isContextValid});
    };

    handleAssigneeChange = (name, value) => {

        const {assignee} = this.state;
        assignee[name] = value;

        const isAssigneeValid = !!(assignee && assignee.user && assignee.title);
        this.setState({assignee, isAssigneeValid});
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const {isContextValid, isAssigneeValid} = this.state;
        const {onAddCommentAndChangeAssignee} = this.props;

        if (isContextValid || isAssigneeValid) {
            onAddCommentAndChangeAssignee(this.state);
        }
    };

    render() {
        const {context, assignee, isAssigneeValid} = this.state;
        const {issue, loading} = this.props;

        const button = <Button loading={loading}
                               disabled={!context && !isAssigneeValid}
                               onClick={this.handleSubmit}
                               content="درج"/>;
        return <Form>
            <TextArea rows={8}
                      value={context}
                      onChange={this.handleTextChange}
            />

            <Ability can='change-issue-assignee'
                     permissions={issue.get('permissions')}
                     elseControl={button}>
                <ChangeAssignee
                    {...assignee}
                    era={issue.getIn(['era', '_id'])}
                    onChange={this.handleAssigneeChange}
                    control={button}
                />
            </Ability>
        </Form>
    }
}

AddComment.propTypes = {
    issue: propTypes.instanceOf(Map).isRequired,
    loading: propTypes.bool,
    onAddCommentAndChangeAssignee: propTypes.func.isRequired,
};

