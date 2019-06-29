import React from 'react';
import propTypes from 'prop-types';
import UserSelection from '../../Selection/User';
import {assigneeTitlesOptions, findKey} from '../../../utils/combo-items';
import {
    Dropdown, Segment
} from 'semantic-ui-react';

class ChangeAssignee extends React.Component {

    handleUserChange = user => {
        this.props.onChange('user', user);
    };
    handleTitleChange = (e, {value}) => {
        this.props.onChange('title', value);
    };

    render() {
        const {era, title, control} = this.props;
        const key = findKey(title, assigneeTitlesOptions);

        return <Segment>
            <Dropdown
                className='button icon'
                icon={key.icon}
                floating
                trigger={<React.Fragment/>}
                options={assigneeTitlesOptions}
                onChange={this.handleTitleChange}
            />
            <UserSelection era={era} onChange={this.handleUserChange}/>
            {control}
        </Segment>
    }
}

ChangeAssignee.propTypes = {
    era: propTypes.string.isRequired,
    title: propTypes.string,
    onChange: propTypes.func.isRequired,
};

ChangeAssignee.defaultProps = {
    era: '',
    title: 'ارجاع',
    onChange: () => null,
};

export default ChangeAssignee;