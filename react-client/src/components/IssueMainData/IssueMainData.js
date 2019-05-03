import React from 'react';
import propTypes from 'prop-types';

import {Segment, Label, Input} from "semantic-ui-react";
import LocaleDate from "../LocaleDate";
import UserView from "../UserView";

class IssueMainData extends React.Component {
    render() {
        const {issue, readOnly} = this.props;
        const creator = issue.get('Creator');
        if (!creator) return <p> Issue loading</p>;

        return (<Segment>
            <Input
                fluid
                icon='bug' iconPosition='left'
                size='huge'
                value={issue.get('title')}
                labelPosition='left'
                label={{tag: true, content: '#' + issue.get('sequence'), as: 'a'}}
            />
            <Label pointing>
                <UserView user={creator.toJS()}/>
            </Label>
            <Label pointing>
                <LocaleDate timestamp={issue.get('createdAt')}/>
            </Label>
            <Label pointing>
                <p>{issue.getIn(['Era', 'title'])}</p>
            </Label>
            <Label pointing>
                <p>{issue.getIn(['Era', 'Origin', 'title'])}</p>
            </Label>
            <Label pointing>
                <p>{issue.getIn(['Realm', 'title'])}</p>
            </Label>
        </Segment>)
    }
}

IssueMainData.propTypes = {
    readOnly: propTypes.bool,
    issue: propTypes.object.isRequired,
};

IssueMainData.defaultProps = {
    readOnly: false,
};

export default IssueMainData;