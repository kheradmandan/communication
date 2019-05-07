import React from 'react';
import {connect} from "react-redux";
import { Map} from "immutable";
import propTypes from 'prop-types';
import * as issueActions from '../../services/issues';
import IssueMainData from "../IssueMainData";
import IssueFeed from '../IssueFeed';

import {Segment, Grid, Divider, Tab, Menu, Label, Icon} from "semantic-ui-react";

class Issue extends React.Component {
    state = {uuid: ''};

    componentDidMount() {
        const {match, current} = this.props;
        if (match && match.params && match.params.uuid) {
            const uuid = match.params.uuid;
            if (uuid !== current.get('uuid')) {
                this.props.getIssueDetails(uuid);
            }
        }
    }

    render() {
        const {current, currentUser} = this.props;

        if (!current || !current.get('Assignees')) {
            return <p> loading </p>;
        }

        let activeAssignee = current.get('Assignees').last();
        if (!activeAssignee || activeAssignee.get('userUuid') !== currentUser.get('uuid')) {
            activeAssignee = null;
        }

        return <div>
            <IssueMainData issue={current}/>
            <Segment>
                <Grid columns={2} stackable relaxed='very'>
                    <Grid.Column>
                        <IssueFeed assignees={current.get('Assignees')} activeAssignee={activeAssignee}/>
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
    current: propTypes.object,
    getIssueDetails: propTypes.func.isRequired,
};

Issue.defaultProps = {
    current: Map(),
    currentUser: Map(),
};

function mapStateToProps(state) {
    return {
        current: state.issues.get('current'),
        currentUser: state.users.get('session').get('user')
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
