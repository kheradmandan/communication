import React from 'react'
import propTypes from 'prop-types'
import {List} from "immutable";
import {connect} from "react-redux";
import Messages from '../Message';
import IssueList from "../IssueList/IssueList";
import AddDialog from '../Issue/AddDialog';
import * as issueActions from '../../services/issues';
import * as requestTypes from "../../constants/request.types";
import {
    Button,
    Segment
} from "semantic-ui-react";

class Dashboard extends React.Component {

    render() {
        const {issues, reloadIssues, isLoading} = this.props;

        return (<div>
            <Messages/>
            <Segment>
                <Button circular primary icon='refresh'
                        onClick={reloadIssues} loading={isLoading}/>
                <AddDialog/>
                <IssueList issues={issues}/>
            </Segment>
        </div>)
    }
}

Dashboard.propTypes = {
    isLoading: propTypes.bool,
    issues: propTypes.instanceOf(List),
};

function mapStateToProps(state) {
    return {
        issues: state.issues.get('list'),
        isLoading: state.requests.get(requestTypes.LOAD_ISSUE_LIST),
    }
}

export default connect(mapStateToProps, issueActions)(Dashboard);
