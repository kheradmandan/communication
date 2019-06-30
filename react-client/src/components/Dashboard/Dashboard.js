import React from 'react'
import propTypes from 'prop-types'
import {List} from 'immutable';
import {connect} from 'react-redux';
import IssueList from './IssueList';
import * as issueActions from '../../services/issues';
import * as requestTypes from '../../constants/request.types';
import {queryOptions, statusOptions} from '../../utils/combo-items';
import {
    Button,
    Dropdown,
    Segment
} from "semantic-ui-react";

class Dashboard extends React.Component {

    state = {
        types: ['created', 'assignee'],
        statuses: ['open'],
    };

    handleTypeChanged = (e, {value}) => {
        this.setState({types: value});
    };

    handleStatusesChanged = (e, {value}) => {
        this.setState({statuses: value});
    };

    handleRefreshButton = () => {
        const {reloadIssues} = this.props;
        const {types, statuses} = this.state;
        if (types.length > 0) {
            reloadIssues({
                types: JSON.stringify(types),
                statuses: JSON.stringify(statuses),
            });
        }
    };

    render() {
        const {issues, isLoading} = this.props;
        const {types, statuses} = this.state;
        const refreshButtonDisabled = !(types.length);

        return (<div>
            <Segment>
                <Button circular primary icon='refresh'
                        loading={isLoading}
                        disabled={refreshButtonDisabled}
                        onClick={this.handleRefreshButton}
                />

                <Dropdown placeholder='Relative' multiple selection
                          options={queryOptions}
                          value={types}
                          onChange={this.handleTypeChanged}
                />
                <Dropdown placeholder='State' multiple selection
                          options={statusOptions}
                          value={statuses}
                          onChange={this.handleStatusesChanged}
                />
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
