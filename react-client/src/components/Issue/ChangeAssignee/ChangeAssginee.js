import React from 'react';
import propTypes from 'prop-types';
import UserSelection from '../../Selection/User';
import {assigneeTitlesOptions, findKey} from '../../../utils/combo-items';
import {
    Dropdown, Segment
} from 'semantic-ui-react';

class ChangeAssignee extends React.Component {

    state = {user: '', title: ''};

    handleUserChange = user => {
        this.setState({user});
        this.props.onChange(this.state);
    };
    handleTitleChange = (e, {value}) => {
        this.setState({title: value});
        this.props.onChange(this.state);
    };

    render() {
        const {era} = this.props;
        const key = findKey(this.state.title, assigneeTitlesOptions);

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