import React from 'react'
import {connect} from "react-redux";
import {Table, Button} from "semantic-ui-react";
import {Link} from "react-router-dom";
import propTypes from 'prop-types'
import LocaleDate from '../LocaleDate';
import * as issueActions from '../../services/issues';
import * as permissionActions from '../../services/permissions';
import Messages from '../Message';
import IssueDialog from "../IssueDialog";

class Dashboard extends React.Component {
    state = {
        column: '',
        direction: null,
        data: null,
    };

    handleSortClick = (clickedColumn, cb) => () => {
        let {column, direction, data} = this.state;

        if (column !== clickedColumn) {
            data = this.props.issues.sortBy(cb);
            this.setState({
                data,
                column: clickedColumn,
                direction: 'ascending'
            });
            return;
        }

        this.setState({
            data: data.reverse(),
            direction: direction === 'ascending' ? 'descending' : 'ascending'
        })
    };

    render() {
        const {issues, reloadIssues} = this.props;
        const {column, direction, data} = this.state;
        const source = data != null ? data : issues;

        return (<div>
            <Messages/>
            <IssueDialog/>
            <Button onClick={reloadIssues}> Reload issues </Button>
            <Button as={Link} to='/issue'> Create Issue</Button>

            <IssueMainTable issues={source} direction={direction} column={column}
                            onSortClick={this.handleSortClick}/>
        </div>)
    }
}

Dashboard.propTypes = {
    signedUser: propTypes.bool,
};

function mapStateToProps(state) {
    return {
        issues: state.issues.get('list'),
        signedUser: state.users.get('session').get('user'),
    }
}

export default connect(mapStateToProps, {...issueActions, ...permissionActions})(Dashboard);


function IssueMainTable({issues, direction, column, onSortClick}) {
    return (<Table compact celled definition selectable color='red' sortable>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell textAlign='center'
                                  sorted={column === 'sequence' ? direction : null}
                                  onClick={onSortClick('sequence', (x) => x.sequence)}>
                    شماره
                </Table.HeaderCell>
                <Table.HeaderCell sorted={column === 'title' ? direction : null}
                                  onClick={onSortClick('title', (x) => x.title)}>
                    عنوان
                </Table.HeaderCell>
                <Table.HeaderCell sorted={column === 'Realm.title' ? direction : null}
                                  onClick={onSortClick('Realm.title', (x) => x.Realm.title)}>
                    بخش
                </Table.HeaderCell>
                <Table.HeaderCell sorted={column === 'Era.Origin.title' ? direction : null}
                                  onClick={onSortClick('Era.Origin.title', (x) => x.Era.Origin.title)}>
                    محل گزارش
                </Table.HeaderCell>
                <Table.HeaderCell sorted={column === 'Era.title' ? direction : null}
                                  onClick={onSortClick('Era.title', (x) => x.Era.title)}>
                    دوره
                </Table.HeaderCell>
                <Table.HeaderCell sorted={column === 'Creator.fullName' ? direction : null}
                                  onClick={onSortClick('Creator.fullName', (x) => x.Creator.fullName)}>
                    ایجاد کننده
                </Table.HeaderCell>
                <Table.HeaderCell sorted={column === 'createdAt' ? direction : null}
                                  onClick={onSortClick('createdAt', (x) => x.createdAt)}>
                    زمان
                </Table.HeaderCell>
                <Table.HeaderCell sorted={column === 'Priority.title' ? direction : null}
                                  onClick={onSortClick('Priority.title', (x) => x.Priority.title)}>
                    اولویت
                </Table.HeaderCell>
                <Table.HeaderCell sorted={column === 'Status.title' ? direction : null}
                                  onClick={onSortClick('Status.Title', (x) => x.Status.title)}>
                    وضعیت
                </Table.HeaderCell>
            </Table.Row>
        </Table.Header>
        <Table.Body>
            {
                issues.map(issue => (
                    <Table.Row key={issue.uuid}>
                        <Table.Cell textAlign='center'>{issue.sequence} </Table.Cell>
                        <Table.Cell><Link to={`/issue/${issue.uuid}`}> {issue.title} </Link></Table.Cell>
                        <Table.Cell>{issue.Realm.title} </Table.Cell>
                        <Table.Cell>{issue.Era.Origin.title} </Table.Cell>
                        <Table.Cell>{issue.Era.title} </Table.Cell>
                        <Table.Cell>{issue.Creator.fullName} </Table.Cell>
                        <Table.Cell> <LocaleDate timestamp={issue.createdAt} relative={true}/></Table.Cell>
                        <Table.Cell>{issue.Priority.title} </Table.Cell>
                        <Table.Cell>{issue.Status.title} </Table.Cell>
                    </Table.Row>))
            }
        </Table.Body>
    </Table>)
}

