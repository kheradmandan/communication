import React from 'react';
import {connect} from 'react-redux';
import propTypes from 'prop-types';
import {List, Map} from "immutable";
import {Dropdown} from "semantic-ui-react";
import * as permissionService from '../../../services/permissions'

class UserSelection extends React.Component {

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

        let mappedOptions = [];
        connections.forEach(x => mappedOptions.push({
            key: x.getIn(['user', '_id']),
            value: x.getIn(['user', '_id']),
            text: x.getIn(['user', 'name', 'first']) + ' ' + x.getIn(['user', 'name', 'last']),
            image: {avatar: true, src: 'https://react.semantic-ui.com/images/avatar/small/jenny.jpg'},
        }));

        return <Dropdown
            openOnFocus
            selection clearable
            options={mappedOptions}
        />
    }
}

UserSelection.propTypes = {
    era: propTypes.string.isRequired,
    current: propTypes.instanceOf(Map),
    permissions: propTypes.instanceOf(Map),
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

export default connect(mapStateToProps, permissionService)(UserSelection);