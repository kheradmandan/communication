import React from 'react';
import propTypes from 'prop-types';
import UserSelection from '../../Selection/User';
import {Dropdown, Segment} from 'semantic-ui-react';
import {assigneeTitlesOptions} from '../../../utils/combo-items';

class ChangeAssignee extends React.Component {

    state = {user: '', title: ''};

    handleUserChange = user => {
        this.setState({user});
        this.props.onChange( this.state);
    };
    handleTitleChange = (e, {value}) => {
        this.setState({title: value});
        this.props.onChange(this.state);
    };

    render() {
        const {era, loading} = this.props;

        return <Segment loading={loading}>
            <UserSelection era={era} onChange={this.handleUserChange}/>
            <Dropdown
                className='button icon'
                floating
                trigger={<React.Fragment/>}
                options={assigneeTitlesOptions}
                onChange={this.handleTitleChange}
            />
        </Segment>
    }
}

ChangeAssignee.propTypes = {
    era: propTypes.string.isRequired,
    issue: propTypes.string.isRequired,
    loading: propTypes.bool.isRequired,
    onChange: propTypes.func.isRequired,
    onCancel: propTypes.func,
};

export default ChangeAssignee;