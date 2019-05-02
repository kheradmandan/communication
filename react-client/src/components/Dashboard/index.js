import React from 'react'
import {connect} from "react-redux";
import {Button} from "semantic-ui-react";
import * as issueActions from '../../actions/issues';
import {Table, Header} from "semantic-ui-react";

class Dashboard extends React.Component {

    render() {
        const {session, issues, reloadIssues} = this.props;

        return (<div>
            <p> this is dashboard</p>
            <p> {session.user.fullName}</p>
            <Button onClick={reloadIssues}>
                Reload issues
            </Button>

            <IssueMainTable issues={issues}/>
        </div>)
    }
}

function mapStateToProps(state) {
    return {
        session: state.users.get('session'),
        issues: state.issues.get('list'),
    }
}

export default connect(mapStateToProps, issueActions)(Dashboard);


function IssueMainTable({issues}) {
    return (<Table compact celled definition>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>
                    شماره
                </Table.HeaderCell>
                <Table.HeaderCell>
                    عنوان
                </Table.HeaderCell>
                <Table.HeaderCell>
                    ایجاد کننده
                </Table.HeaderCell>
                <Table.HeaderCell>
                    زمان
                </Table.HeaderCell>
                <Table.HeaderCell>
                    اولویت
                </Table.HeaderCell>
                <Table.HeaderCell>
                    وضعیت
                </Table.HeaderCell>
            </Table.Row>
        </Table.Header>
        <Table.Body>
            {
                issues.map(issue => (
                    <Table.Row key={issue.uuid}>
                        <Table.Cell>{issue.Era.current} </Table.Cell>
                        <Table.Cell>{issue.title} </Table.Cell>
                        <Table.Cell>{issue.Creator.fullName} </Table.Cell>
                        <Table.Cell>{issue.createdAt} </Table.Cell>
                        <Table.Cell>{issue.priorityId} </Table.Cell>
                        <Table.Cell>{issue.statusId} </Table.Cell>
                    </Table.Row>))
            }
        </Table.Body>
    </Table>)
}