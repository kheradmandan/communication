import React from 'react';
import {Map} from 'immutable';
import propTypes from 'prop-types';
import Ability from '../../Ability';
import Selection from '../../Selection';
import {assigneeTitlesOptions, findKey} from '../../../utils/combo-items';
import {
    Form,
    Button,
    Dropdown,
    Icon
} from 'semantic-ui-react';
import TextareaAutoSize from 'react-textarea-autosize';
import ChangeAssignee from '../ChangeAssignee/ChangeAssginee';

export default class AddComment extends React.Component {

    state = {
        context: '',
        status: '',
        title: '',
        assigneeId: '',
    };

    handleTextChange = (e, {value}) => {
        this.setState({context: value});
    };

    handleUserChange = userId => {
        this.setState({assigneeId: userId});
    };

    handleAssigneeTitleChanged = (e, {value}) => {
        this.setState({title: value});
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const {context, assigneeId, title} = this.state;
        const {issue, onAddComment, onChangeAssignee} = this.props;

        if (context && context.length > 0) {
            onAddComment(issue.get('_id'), context)
        }

        if (assigneeId) {
            onChangeAssignee(issue.get('_id'), assigneeId, title);
        }
    };

    render() {
        const {context, assigneeId, title} = this.state;
        const {issue,isChangeAssignee} = this.props;
        const iconName = findKey(assigneeId && title, assigneeTitlesOptions).icon;

        return <Form>
            <TextareaAutoSize maxLength={2048}
                              value={context}
                              useCacheForDOMMeasurements
                              onChange={this.handleTextChange}
            />

            <Ability can='change-issue-assignee' permissions={issue.get('permissions')}>
                <ChangeAssignee era={issue.getIn(['era'])} issue={issue.get('_id')} loading={isChangeAssignee} onChange={null}/>
                <Selection.User onChange={this.handleUserChange}/>
            </Ability>
            <Button.Group>
                <Dropdown
                    className='button icon'
                    floating
                    trigger={<React.Fragment/>}
                    options={assigneeTitlesOptions}
                    onChange={this.handleAssigneeTitleChanged}
                />
                <Button disabled={!context && !assigneeId} onClick={this.handleSubmit}>
                    <Icon name={iconName}/>
                    درج
                </Button>
            </Button.Group>
        </Form>
    }
}

AddComment.propTypes = {
    issue: propTypes.instanceOf(Map).isRequired,
    onAddComment: propTypes.func.isRequired,
    onChangeAssignee: propTypes.func.isRequired,
};

