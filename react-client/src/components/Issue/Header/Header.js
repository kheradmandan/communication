import React from 'react';
import propTypes from 'prop-types';

import {Segment, Label, Input} from "semantic-ui-react";
import LocaleDate from "../../LocaleDate";
import User from "../../User";

class Header extends React.Component {
    render() {
        const {issue, loading} = this.props;
        if (loading) return <p> Issue loading</p>;

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
                <User source={issue.getIn(['created', 'by'])} by='توسط'/>
            </Label>
            <Label pointing>
                <LocaleDate timestamp={issue.getIn(['created', 'at'])}/>
            </Label>
            <Label pointing>
                <p>{issue.getIn(['era', 'title'])}</p>
            </Label>
            <Label pointing>
                <p>{issue.getIn(['era', 'origin', 'title'])}</p>
            </Label>
            <Label pointing>
                <p>{issue.getIn(['realm', 'title'])}</p>
            </Label>
        </Segment>)
    }
}

Header.propTypes = {
    readOnly: propTypes.bool,
    issue: propTypes.object.isRequired,
};

Header.defaultProps = {
    readOnly: false,
};

export default Header;