import React from 'react';
import propTypes from 'prop-types';
import {connect} from "react-redux";
import {Map, List} from "immutable";
import {Dropdown} from "semantic-ui-react";

import * as permissionActions from '../../services/permissions';

class RealmSelection extends React.Component {


    componentWillUpdate(nextProps, nextState, nextContext) {
        const newOriginId = nextProps.originId;
        if (this.props.originId !== newOriginId) {
            let realms = this.props.permissions.getIn(['xref-origins-realms', newOriginId]);
            if (!realms) {
                this.props.loadXrefOriginsRealms(newOriginId);
            }
        }
    }

    render() {
        const {originId, defaultValue, onSelection} = this.props;
        const realms = this.props.permissions.getIn(['xref-origins-realms', originId]);

        let options = realms || [];
        if (List.isList(options)) options = options.toJS();

        let mappedOptions = options
            .filter(x => x['Realm']['parentId'])
            .map(x => ({key: x['Realm']['id'], value: x['Realm']['id'], text: x['Realm']['title']}));

        return <Dropdown
            openOnFocus
            selection
            options={mappedOptions}
            value={defaultValue}
            name='Realm'
            onChange={onSelection}
        />
    }
}

RealmSelection.propTypes = {
    originId: propTypes.number,
    defaultValue: propTypes.number,
    onSelection: propTypes.func.isRequired,
    permissions: propTypes.instanceOf(Map).isRequired,
    loadXrefOriginsRealms: propTypes.func.isRequired,
};

RealmSelection.defaultProps = {
    originId: -1,
    defaultValue: 0,
};

function mapStateToProps(state) {
    return {
        permissions: state.permissions,
    }
}

export default connect(mapStateToProps, permissionActions)(RealmSelection);
