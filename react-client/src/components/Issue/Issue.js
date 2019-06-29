import React from 'react';
import {connect} from 'react-redux';
import {Map} from 'immutable';
import propTypes from 'prop-types';
import History from './History';
import Header from './Header';
import Feed from './Feed';
import * as actions from '../../services/issues';
import * as requestTypes from '../../constants/request.types';
import {
    Container,
    Segment,
    Message,
    Icon,
    Tab,
} from 'semantic-ui-react';

class Issue extends React.Component {
    state = {loadedId: '', isLoadRequiredTried: false};

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.getIssueDetails(id);
    }

    handleInsertCommentAndAssignee = (state) => {
        const {addComment, changeAssignee, getIssueDetails, current} = this.props;
        const {context, assignee, isAssigneeValid, isContextValid} = state;
        const issueId = current.get('_id');

        // Just comment add
        if (isContextValid && !isAssigneeValid) {
            addComment(issueId, context)
                .then(() => getIssueDetails(issueId));
        }

        // Just assignee change
        if (!isContextValid && isAssigneeValid) {
            changeAssignee(issueId, assignee.user, assignee.title)
                .then(() => getIssueDetails(issueId));
        }

        // Both add comment and change assignee in a chain
        if (isContextValid && isAssigneeValid) {
            addComment(issueId, context)
                .then(() => changeAssignee(issueId, assignee.user, assignee.title))
                .then(() => getIssueDetails(issueId));
        }
    };

    handleCloseButtonClick = () => {
        const {changeStatus, getIssueDetails, current} = this.props;
        const issueId = current.get('_id');
        changeStatus(issueId, 'closed')
            .then(() => getIssueDetails(issueId));
    };

    handleRemoveButtonClick = () => {
        const {changeStatus, getIssueDetails, current} = this.props;
        const issueId = current.get('_id');
        changeStatus(issueId, 'remove')
            .then(() => getIssueDetails(issueId));
    };

    render() {
        const {current, loading} = this.props;

        if (loading) {
            return <Message>
                <Icon name='circle notched' loading/>
                <Message.Header>
                    باز آوری
                </Message.Header>
                <Message.Header>
                    لطفا کمی منتظر بمانید..
                </Message.Header>
            </Message>
        }
        if (!current || !current.get('assignees')) {
            return <Message>
                <Icon name='circle notched'/>
                <Message.Header>
                    باز آوری
                </Message.Header>
                <Message.Header>
                    باز آوری انجام نشد.
                </Message.Header>
            </Message>
        }

        return <Container>
            <Header issue={current} loading={loading}
                    onCloseIssue={this.handleCloseButtonClick}
                    onRemoveIssue={this.handleRemoveButtonClick}/>
            <Segment>
                <Tab
                    panes={[
                        {
                            menuItem: {key: 'feed', icon: 'feed', content: 'یادداشت ها'},
                            render: () => <Tab.Pane><Feed issue={current}
                                                          onAddCommentAndChangeAssignee={this.handleInsertCommentAndAssignee}/></Tab.Pane>
                        }, {
                            menuItem: {key: 'attachments', icon: 'attach', content: 'پیوست ها'},
                            render: () => <Tab.Pane>Attachments goes here </Tab.Pane>
                        }, {
                            menuItem: {key: 'histories', icon: 'history', content: 'تاریخچه'},
                            render: () => <Tab.Pane><History issue={current}/></Tab.Pane>
                        },
                    ]}
                />
            </Segment>
        </Container>
    }
}

Issue.propTypes = {
    loading: propTypes.bool,
    current: propTypes.instanceOf(Map),
    addComment: propTypes.func.isRequired,
    getIssueDetails: propTypes.func.isRequired,
};

Issue.defaultProps = {
    loading: false,
    current: Map(),
    currentUser: Map(),
};

function mapStateToProps(state) {
    return {
        current: state.issues.get('current'),
        loading: state.requests.get(requestTypes.LOAD_ISSUE_DETAILS),
        currentUser: state.users.getIn(['session', 'user']),
    }
}

export default connect(mapStateToProps, actions)(Issue);