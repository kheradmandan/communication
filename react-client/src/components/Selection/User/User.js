import React from 'react';
import {connect} from 'react-redux';
import propTypes from 'prop-types';
import {Dropdown} from 'semantic-ui-react';
import {List, Map} from 'immutable';
import {avatarUrl} from '../../../utils/remote-utils';
import * as services from '../../../services/permissions';

class UserSelection extends React.Component {

    handleChange = (e, {value}) => {
        const {onChange} = this.props;
        if (onChange) {
            onChange(value);
        }
    };

    render() {
        let {era, current, permissions, getPermissionForEra} = this.props;
        if (!era) {
            era = current.getIn(['era', '_id'])
        }

        const permissionInEra = permissions.get(era);
        if (!permissionInEra && era) {
            getPermissionForEra(era);
        }

        let connections = List();
        if (permissionInEra) {
            connections = permissionInEra.getIn(['permission', 'connections']) || List();
        }

        let options = [];
        connections.forEach(user => options.push({
            key: user.get('_id'),
            value: user.get('_id'),
            text: user.getIn(['name', 'first']) + ' ' + user.getIn(['name', 'last']),
            image: {avatar: true, src: avatarUrl(user.get('_id'))},
        }));

        return <Dropdown
            openOnFocus
            selection clearable
            options={options}
            onChange={this.handleChange}
            placeholder='گیرنده'
        />
    }
}

UserSelection.propTypes = {
    era: propTypes.string.isRequired,
    current: propTypes.instanceOf(Map),
    permissions: propTypes.instanceOf(Map),
    onChange: propTypes.func,
};

UserSelection.defaultProps = {
    era: '',
    current: Map(),
    permissions: Map(),
};

function mapStateToProps(state) {
    return {
        current: state.issues.get('current'),
        permissions: state.permissions,
    }
}

export default connect(mapStateToProps, services)(UserSelection);