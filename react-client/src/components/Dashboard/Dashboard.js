import React from 'react'
import propTypes from 'prop-types'
import {List} from "immutable";
import {connect} from "react-redux";
import {Button, Segment} from "semantic-ui-react";
import Messages from '../Message';
import IssueList from "../IssueList/IssueList";
// import IssueDialog from '../IssueDialog';
import * as issueActions from '../../services/issues';
import * as requestTypes from "../../constants/request.types";

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
                <Button circular primary icon='refresh'
                        onClick={reloadIssues} loading={isLoading}/>

                <Button circular positive icon='add' content='افزودن'/>
                {/*<IssueDialog/>*/}

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
        isLoading: state.requests.get(requestTypes.ISSUE),
    }
}

export default connect(mapStateToProps,  issueActions)(Dashboard);
