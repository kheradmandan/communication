import React from 'react';
import propTypes from 'prop-types';
import {List} from 'immutable';
import {Link} from 'react-router-dom';
import User from '../User';
import LocaleDate from '../LocaleDate';
import {
    Button, Table
} from 'semantic-ui-react';

class IssueList extends React.Component {
    state = {
        column: '',
        direction: null,
        data: null,
    };

    handleSortClick = (clickedColumn, cb) => () => {
        let {column, direction, data} = this.state;

        if (column !== clickedColumn) {
            data = this.props.issues.sort((r, l) => cb(r) > cb(l));
            this.setState({
                data,
                column: clickedColumn,
                direction: 'up'
            });
            return;
        }

        this.setState({
            data: data.reverse(),
            direction: direction === 'down' ? 'up' : 'down'
            // direction: direction === 'ascending' ? 'descending' : 'ascending'
        })
    };

    render() {
        const {direction, column, data} = this.state;
        const {issues} = this.props;
        const orderedIssues = data != null ? data : issues;

        return (<Table compact celled definition selectable color='red' sortable>
            <Table.Header>
                <Table.Row>
                    <MyHeader name='sequence'
                              path={['sequence']}
                              icon='sort numeric'
                              column={column} direction={direction}
                              onSortClick={this.handleSortClick}
                              cellProps={{textAlign: 'center'}}
                              content="شماره"
                    />
                    <MyHeader name='title'
                              path={['title']}
                              icon='sort alphabet'
                              column={column} direction={direction}
                              onSortClick={this.handleSortClick}
                              content="عنوان"
                    />
                    <MyHeader name='realm.title'
                              path={['realm', 'title']}
                              icon='sort alphabet'
                              column={column} direction={direction}
                              onSortClick={this.handleSortClick}
                              content="بخش"
                    />
                    <MyHeader name='era.origin.title'
                              path={['era', 'origin', 'title']}
                              icon='sort alphabet'
                              column={column} direction={direction}
                              onSortClick={this.handleSortClick}
                              content=" محل گزارش"
                    />
                    <MyHeader name='era.title'
                              path={['era', 'title']}
                              icon='sort alphabet'
                              column={column} direction={direction}
                              onSortClick={this.handleSortClick}
                              content="دوره"
                    />
                    <MyHeader name='created.by'
                              path={['created', 'by', 'name', 'first']}
                              icon='sort alphabet'
                              column={column} direction={direction}
                              onSortClick={this.handleSortClick}
                              content="ایجاد کننده"
                    />
                    <MyHeader name='created.at'
                              path={['created', 'at']}
                              icon='sort alphabet'
                              column={column} direction={direction}
                              onSortClick={this.handleSortClick}
                              content="زمان"
                    />
                    <MyHeader name='priority.id'
                              path={['priority', 'id']}
                              icon='sort numeric'
                              column={column} direction={direction}
                              onSortClick={this.handleSortClick}
                              content="تقدم"
                    />
                    <MyHeader name='status.id'
                              path={['status', 'id']}
                              icon='sort alphabet'
                              column={column} direction={direction}
                              onSortClick={this.handleSortClick}
                              content="وضعیت"
                    />
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
                            <Table.Cell><User source={issue.getIn(['assignees', 0, 'created', 'by'])}/> </Table.Cell>
                            <Table.Cell><LocaleDate timestamp={issue.getIn(['assignees', 0, 'created', 'at'])}
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

const MyHeader = ({column, direction, name, path = [], icon = 'sort', cellProps, content, onSortClick}) => {

    const iconName = icon + ' ' + (column === name ? direction : '');
    const onSort = onSortClick(name, issue => issue.getIn(path));

    return <Table.HeaderCell {...cellProps}>
        <Button.Group size='mini'>
            <Button icon='filter'/>
            <Button icon={iconName}
                    onClick={onSort}/>
        </Button.Group>
        {content}
    </Table.HeaderCell>
};