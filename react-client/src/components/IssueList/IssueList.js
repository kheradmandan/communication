import React from 'react';
import propTypes from 'prop-types';
import {List} from 'immutable';
import {Link} from 'react-router-dom';
import {Table} from 'semantic-ui-react';

import User from '../User';
import LocaleDate from '../LocaleDate';

class IssueList extends React.Component {
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
        const {direction, column, data} = this.state;
        const {issues} = this.props;
        const orderedIssues = data != null ? data : issues;

        return (<Table compact celled definition selectable color='red' sortable>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell textAlign='center'
                                      sorted={column === 'sequence' ? direction : null}
                                      onClick={this.handleSortClick('sequence', (x) => x.get('sequence'))}>
                        شماره
                    </Table.HeaderCell>
                    <Table.HeaderCell sorted={column === 'title' ? direction : null}
                                      onClick={this.handleSortClick('title', (x) => x.get('title'))}>
                        عنوان
                    </Table.HeaderCell>
                    <Table.HeaderCell sorted={column === 'realm.title' ? direction : null}
                                      onClick={this.handleSortClick('realm.title', (x) => x.getIn(['realm', 'title']))}>
                        بخش
                    </Table.HeaderCell>
                    <Table.HeaderCell sorted={column === 'era.origin.title' ? direction : null}
                                      onClick={this.handleSortClick('era.origin.title', (x) => x.getIn(['era', 'origin', 'title']))}>
                        محل گزارش
                    </Table.HeaderCell>
                    <Table.HeaderCell sorted={column === 'era.title' ? direction : null}
                                      onClick={this.handleSortClick('era.title', (x) => x.getIn(['era', 'title']))}>
                        دوره
                    </Table.HeaderCell>
                    <Table.HeaderCell sorted={column === 'created.by' ? direction : null}
                                      onClick={this.handleSortClick('created.by',
                                          (x) => x.getIn(['created', 'by', 'name', 'first']) + x.getIn(['created', 'by', 'name', 'last']))}>
                        ایجاد کننده
                    </Table.HeaderCell>
                    <Table.HeaderCell sorted={column === 'created.at' ? direction : null}
                                      onClick={this.handleSortClick('created.at', (x) => x.getIn(['created', 'at']))}>
                        زمان
                    </Table.HeaderCell>
                    <Table.HeaderCell sorted={column === 'priority.id' ? direction : null}
                                      onClick={this.handleSortClick('priority.id', (x) => x.getIn(['priority', 'id']))}>
                        اولویت
                    </Table.HeaderCell>
                    <Table.HeaderCell sorted={column === 'status.id' ? direction : null}
                                      onClick={this.handleSortClick('status.id', (x) => x.getIn(['status', 'id']))}>
                        وضعیت
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {
                    orderedIssues.map(issue => (
                        <Table.Row key={issue._id}>
                            <Table.Cell textAlign='center'>{issue.get('sequence')} </Table.Cell>
                            <Table.Cell><Link
                                to={`/issue/${issue.get('_id')}/${issue.get('sequence')}/${issue.getIn(['era', 'origin', 'title'])}/${issue.getIn(['era', 'title'])}`}> {issue.get('title')} </Link></Table.Cell>
                            <Table.Cell>{issue.getIn(['realm', 'title'])} </Table.Cell>
                            <Table.Cell>{issue.getIn(['era', 'origin', 'title'])} </Table.Cell>
                            <Table.Cell>{issue.getIn(['era', 'title'])} </Table.Cell>
                            <Table.Cell><User source={issue.getIn(['created', 'by'])}/> </Table.Cell>
                            <Table.Cell><LocaleDate timestamp={issue.getIn(['created', 'at'])}
                                                    relative={true}/></Table.Cell>
                            <Table.Cell>{issue.get('priorities').first().get('id')} </Table.Cell>
                            <Table.Cell>{issue.get('statuses').first().get('id')} </Table.Cell>
                        </Table.Row>))
                }
            </Table.Body>
        </Table>)
    }
}

IssueList.propTypes = {
    issues: propTypes.instanceOf(List).isRequired,
};

IssueList.defaultProps = {
    issues: List(),
};

export default IssueList;