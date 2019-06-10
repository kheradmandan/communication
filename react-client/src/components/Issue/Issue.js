import React from 'react';
import {connect} from "react-redux";
import {Map} from "immutable";
import propTypes from 'prop-types';
import * as issueActions from '../../services/issues';
import IssueMainData from "../IssueMainData";
import IssueFeed from '../IssueFeed';

import {Segment, Grid, Divider, Tab, Menu, Label, Icon} from "semantic-ui-react";
import * as requestTypes from "../../constants/request.types";

class Issue extends React.Component {
    state = {uuid: ''};

    componentDidMount() {
        this.fetchDetails(this.props);
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        this.fetchDetails(nextProps);
    }

    fetchDetails = (props) => {
        const {match, current} = props;
        if (match && match.params && match.params.id) {
            const id = match.params.id;
            if (id !== current.get('_id')) {
                this.props.getIssueDetails(id);
            }
        }
    };

    render() {
        const {current, currentUser, addComment, isLoading} = this.props;

        if (!current || !current.get('assignees')) {
            return <p> loading </p>;
        }

        let activeAssignee = current.get('assignees').first();
        if (!activeAssignee || activeAssignee.getIn(['user', '_id']) !== currentUser.get('_id')) {
            activeAssignee = null;
        }

        return <div>
            <IssueMainData issue={current} loading={isLoading}/>
            <Segment loading={isLoading}>
                <Grid columns={2} stackable relaxed='very'>
                    <Grid.Column>
                        <IssueFeed
                            assignees={current.get('assignees')}
                            activeAssignee={activeAssignee}
                            onAddComment={addComment}
                        />
                        {/*<CommentPane comments={current.get('Comments')}/>*/}
                    </Grid.Column>
                    <Grid.Column>
                        <LeftPanel/>
                    </Grid.Column>
                </Grid>
                <Divider vertical>*</Divider>
            </Segment>
        </div>
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

const panes = [
    {
        menuItem: {key: 'histories', icon: 'history', content: 'تاریخچه'},
        render: () => <Tab.Pane>histories go here</Tab.Pane>
    },
    {
        menuItem: (<Menu.Item key='attachments'>
            <Icon name='attach'/>
            پیوست ها
            <Label>0</Label>
        </Menu.Item>),
        render: () => <Tab.Pane>attach go here</Tab.Pane>
    },
];
const LeftPanel = () => <Tab panes={panes}/>;
