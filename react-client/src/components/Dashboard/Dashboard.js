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
import User from "../User";

class Dashboard extends React.Component {
    state = {
        column: '',
        direction: null,
        data: null,
    };

    handleSortClick = (clickedColumn, cb) => () => {
        let {column, direction, data} = this.state;

        if (column !== clickedColumn) {
            data = this.props.issues.sort(cb);
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
        issues: state.issues.get('list').toJS(),
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
                <Table.HeaderCell sorted={column === 'realm.title' ? direction : null}
                                  onClick={onSortClick('realm.title', (x) => x.realm.title)}>
                    بخش
                </Table.HeaderCell>
                <Table.HeaderCell sorted={column === 'era.origin.title' ? direction : null}
                                  onClick={onSortClick('era.origin.title', (x) => x.era.origin.title)}>
                    محل گزارش
                </Table.HeaderCell>
                <Table.HeaderCell sorted={column === 'era.title' ? direction : null}
                                  onClick={onSortClick('era.title', (x) => x.era.title)}>
                    دوره
                </Table.HeaderCell>
                <Table.HeaderCell sorted={column === 'created.by' ? direction : null}
                                  onClick={onSortClick('creatored.by',
                                      (x) => x.created.by.name.first + x.created.by.name.last)}>
                    ایجاد کننده
                </Table.HeaderCell>
                <Table.HeaderCell sorted={column === 'created.at' ? direction : null}
                                  onClick={onSortClick('created.at', (x) => x.created.at)}>
                    زمان
                </Table.HeaderCell>
                <Table.HeaderCell sorted={column === 'priority.id' ? direction : null}
                                  onClick={onSortClick('priority.id', (x) => x.priority.id)}>
                    اولویت
                </Table.HeaderCell>
                <Table.HeaderCell sorted={column === 'status.id' ? direction : null}
                                  onClick={onSortClick('status.id', (x) => x.status.id)}>
                    وضعیت
                </Table.HeaderCell>
            </Table.Row>
        </Table.Header>
        <Table.Body>
            {
                issues .map(issue => (
                    <Table.Row key={issue._id}>
                        <Table.Cell textAlign='center'>{issue.sequence} </Table.Cell>
                        <Table.Cell><Link to={`/issue/${issue._id}`}> {issue.title} </Link></Table.Cell>
                        <Table.Cell>{issue.realm.title} </Table.Cell>
                        <Table.Cell>{issue.era.origin.title} </Table.Cell>
                        <Table.Cell>{issue.era.title} </Table.Cell>
                        <Table.Cell><User source={issue.created.by}/> </Table.Cell>
                        <Table.Cell><LocaleDate timestamp={issue.created.at}
                                                relative={true}/></Table.Cell>
                        <Table.Cell>{issue.priorities[0].id} </Table.Cell>
                        <Table.Cell>{issue.statuses[0].id} </Table.Cell>
                    </Table.Row>))
            }
        </Table.Body>
    </Table>)
}

