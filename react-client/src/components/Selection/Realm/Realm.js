import React from 'react';
import propTypes from 'prop-types';
import {connect} from 'react-redux';
import {List, Map} from 'immutable';
import {Dropdown} from 'semantic-ui-react';

class RealmSelection extends React.Component {

    handleChange = (e, {value}) => {
        const {onChange} = this.props;
        if (onChange) {
            onChange(value);
        }
    };

    render() {

        const {permissions, era} = this.props;
        const realms = permissions.getIn([era, 'permission', 'realms']) || List();

        const options = [];
        realms.forEach(realm => options.push({
            id: realm.getIn(['realm', '_id']),
            value: realm.getIn(['realm', '_id']),
            text: realm.getIn(['realm', 'title'])
        }));

        return <Dropdown
            selection clearable search
            options={options}
            onChange={this.handleChange}
            placeholder='سیستم/زیر سیستم'
        />
    }
}

RealmSelection.proptTypes = {
    era: propTypes.string.isRequired,
    onChange: propTypes.func,
    permissions: propTypes.instanceOf(Map).isRequired,
};

RealmSelection.defaultProps = {
    era: '',
    permissions: Map(),
};

function mapStateToProps(state) {
    return {
        permissions: state.permissions
    }
}

export default connect(mapStateToProps)(RealmSelection);