import React from 'react';
import {Table, Label} from "semantic-ui-react";
import User from '../../User';
import LocaleDate from "../../LocaleDate";

export default function ({issue}) {

    if (!issue) {
        return null;
    }

    return <Table>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell/>
                <Table.HeaderCell>زمان</Table.HeaderCell>
                <Table.HeaderCell>توسط</Table.HeaderCell>
                <Table.HeaderCell>به</Table.HeaderCell>
            </Table.Row>
        </Table.Header>
        <Table.Body>
            {issue.get('assignees').map(assignee =>
                <Table.Row key={assignee.get('_id')}>
                    <Table.Cell key={assignee.get('_id') + '1'}>
                        <Label ribbon>{assignee.get('title') || 'ارجاع'}</Label>
                    </Table.Cell>
                    <Table.Cell key={assignee.get('_id') + '2'}>
                        <LocaleDate timestamp={assignee.getIn(['created', 'at'])}/>
                    </Table.Cell>
                    <Table.Cell key={assignee.get('_id') + '2'}>
                        <User source={assignee.getIn(['created', 'by'])}/>
                    </Table.Cell>
                    <Table.Cell key={assignee.get('_id') + '3'}>
                        <User source={assignee.get('user')}/>
                    </Table.Cell>
                </Table.Row>
            )}
        </Table.Body>

    </Table>
}