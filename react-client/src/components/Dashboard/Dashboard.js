import React from 'react'
import {connect} from "react-redux";
import {Button, Segment} from "semantic-ui-react";
import {Link} from "react-router-dom";
import propTypes from 'prop-types'
import * as issueActions from '../../services/issues';
import * as permissionActions from '../../services/permissions';
import Messages from '../Message';
import IssueDialog from "../IssueDialog";
import * as requestTypes from "../../constants/request.types";
import {List} from "immutable";
import IssueList from "../IssueList/IssueList";

class Dashboard extends React.Component {

    componentDidMount() {
        const {issues, reloadIssues} = this.props;
        if (issues.count() === 0) {
            reloadIssues();
        }
    }

    render() {
        const {issues, reloadIssues, isLoading} = this.props;

        return (<div>
                <Messages/>
                <Segment>

                    <Button circular positive icon='refresh'
                            onClick={reloadIssues} loading={isLoading}/>

                    <IssueDialog/>
                    <Button as={Link} to='/issue'> Create Issue</Button>
                <IssueList issues={issues}/>
                </Segment>
            </div>
        )
    }
}

Dashboard.propTypes = {
    isLoading: propTypes.bool,
    signedUser: propTypes.bool,
    issues: propTypes.instanceOf(List),
};

function mapStateToProps(state) {
    return {
        issues: state.issues.get('list'),
        isLoading: state.requests.get(requestTypes.ISSUE),
        signedUser: state.users.get('session').get('user'),
    }
}

export default connect(mapStateToProps, {...issueActions, ...permissionActions})(Dashboard);
