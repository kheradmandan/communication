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

    handleAddComment = (...args) => {
        const {addComment, getIssueDetails, current} = this.props;
        addComment(...args);
        getIssueDetails(current.get('_id'));
    };

    handleChangeAssignee = (...args) => {
        const {changeAssignee, getIssueDetails, current} = this.props;
        changeAssignee(...args);
        getIssueDetails(current.get('_id'));
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
            <Header issue={current}/>
            <Segment>
                <Tab
                    panes={[
                        {
                            menuItem: {key: 'feed', icon: 'feed', content: 'یادداشت ها'},
                            render: () => <Tab.Pane><Feed issue={current}
                                                          onAddComment={this.handleAddComment}
                                                          onChangeAssignee={this.handleChangeAssignee}/></Tab.Pane>
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