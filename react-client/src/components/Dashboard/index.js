import React from 'react'
import {connect} from "react-redux";
import {Button} from "semantic-ui-react";
import * as issueActions from '../../actions/issues';
import {Table} from "semantic-ui-react";
import LocaleDate from '../LocaleDate';

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
    return (<Table compact celled definition selectable textAlign='right'>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell textAlign='center'>
                    شماره
                </Table.HeaderCell>
                <Table.HeaderCell>
                    عنوان
                </Table.HeaderCell>
                <Table.HeaderCell>
                    حوزه
                </Table.HeaderCell>
                <Table.HeaderCell>
                    دوره
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
                        <Table.Cell textAlign='center'>{issue.sequence} </Table.Cell>
                        <Table.Cell>{issue.title} </Table.Cell>
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

