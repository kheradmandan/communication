import React from 'react';
import {connect} from 'react-redux';
import {Map} from 'immutable';
import propTypes from 'prop-types';
import {Segment, Tab, Container} from 'semantic-ui-react';
import * as issueActions from '../../services/issues';
import * as requestTypes from '../../constants/request.types';
import History from './History';
import Header from './Header';
import Feed from './Feed';

class Issue extends React.Component {
    state = {loadedId: ''};

    componentDidMount() {
        this.fetchDetails(this.props);
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        this.fetchDetails(nextProps);
    }

    fetchDetails = (props) => {
        const {loadedId} = this.state;
        const id = props.match.params.id;
        if (id !== loadedId) {
            this.setState({loadedId: id});
            this.props.getIssueDetails(id);
        }
    };

    render() {
        const {current, currentUser, addComment, isLoading} = this.props;

        if (!current || !current.get('assignees')) {
            return <Segment loading/>
        }

        let activeAssignee = current.get('assignees').first();
        if (!activeAssignee || activeAssignee.getIn(['user', '_id']) !== currentUser.get('_id')) {
            activeAssignee = null;
        }

        return <Container>
            <Header issue={current} loading={isLoading}/>
            <Segment loading={isLoading}>
                <Tab
                    panes={[
                        {
                            menuItem: {key: 'feed', icon: 'feed', content: 'یادداشت ها'},
                            render: () => <Tab.Pane><Feed issue={current} onAddComment={addComment}/></Tab.Pane>
                        },{
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
    isLoading: propTypes.bool,
    current: propTypes.instanceOf(Map),
    addComment: propTypes.func.isRequired,
    getIssueDetails: propTypes.func.isRequired,
};

Issue.defaultProps = {
    isLoading: false,
    current: Map(),
    currentUser: Map(),
};

function mapStateToProps(state) {
    return {
        current: state.issues.get('current'),
        isLoading: state.requests.get(requestTypes.ISSUE),
        currentUser: state.users.getIn(['session', 'user']),
    }
}

export default connect(mapStateToProps, issueActions)(Issue);