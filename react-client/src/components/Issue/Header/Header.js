import React from 'react';
import propTypes from 'prop-types';
import User from '../../User';
import Ability from '../../Ability';
import LocaleDate from '../../LocaleDate';
import YesOrNoButton from '../../YesOrNoButton';
import {findKey, statusOptions} from '../../../utils/combo-items';
import {
    Segment,
    Label,
    Input,
    Button,
} from 'semantic-ui-react';

class Header extends React.Component {
    render() {
        const {issue, loading} = this.props;
        if (loading) return <p> Issue loading</p>;

        return (<Segment>
            <Input
                fluid
                icon='bug'
                size='big'
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

            <Ability can='close-issue'>
                <YesOrNoButton
                    trigger={<Button icon={findKey('closed', statusOptions).icon} positive content='بستن مبحث'/>}
                    buttons={[{
                        content: 'بسته شود؟',
                        exp: 'مبحث به آرشیو منتقل خواهد شد',
                        color: 'blue'
                    }]}
                />

            </Ability>
            <Ability can='remove-issue'>
                <YesOrNoButton
                    trigger={
                        <Button icon={findKey('removed', statusOptions).icon} color={'yellow'} content='حذف مبحث'/>}
                    buttons={[{
                        content: 'حذف شود؟',
                        exp: 'مبحث برای همیشه از دسترس خارج خواهد شد',
                        color: 'red'
                    }]}
                />
            </Ability>
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