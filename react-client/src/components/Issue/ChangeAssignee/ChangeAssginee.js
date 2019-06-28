import React from 'react';
import propTypes from 'prop-types';
import UserSelection from '../../Selection/User';
import {Button, Dropdown, Segment} from 'semantic-ui-react';
import {assigneeTitlesOptions} from '../../../utils/combo-items';

class ChangeAssignee extends React.Component {

    state = {user: '', title: ''};

    handleUserChange = user => this.setState({user});
    handleTitleChange = (e, {value}) => this.setState({title: value});
    handChangeButton = () => {
        const {issue} = this.props;
        const {user, title} = this.state;

        this.props.onChange(issue, user, title);
    };

    render() {
        const {era, onCancel, loading} = this.props;
        const {user} = this.state;

        return <Segment loading={loading}>
            <UserSelection era={era} onChange={this.handleUserChange}/>
            <Dropdown
                className='button icon'
                floating
                trigger={<React.Fragment/>}
                options={assigneeTitlesOptions}
                onChange={this.handleTitleChange}
            />
            <Button primary onClick={this.handChangeButton} enabled={user}>
                ذخیره
            </Button>
            <Button secondary onClick={onCancel}>
                انصراف
            </Button>
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