import React from 'react'
import propTypes from 'prop-types'
import {List} from 'immutable';
import {connect} from 'react-redux';
import IssueList from './IssueList';
import * as issueActions from '../../services/issues';
import * as requestTypes from '../../constants/request.types';
import {
    Button, Dropdown,
    Segment
} from "semantic-ui-react";
import {queryOptions} from '../../utils/combo-items';

class Dashboard extends React.Component {

    state = {query: ['created', 'assignee']};

    handleQueryChanged = (e, {value}) => {
        this.setState({query: value});
    };

    render() {
        const {issues, reloadIssues, isLoading} = this.props;
        const {query} = this.state;
        const refreshButtonDisabled = !(query.length);

        return (<div>
            <Segment>
                <Button circular primary icon='refresh' onClick={reloadIssues} loading={isLoading}
                        disabled={refreshButtonDisabled}/>
                <Dropdown options={queryOptions} value={query} onChange={this.handleQueryChanged} placeholder='State'
                          multiple selection/>
            </Segment>
            <IssueList issues={issues}/>
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
