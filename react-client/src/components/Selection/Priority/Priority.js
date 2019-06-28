import React from 'react';
import propTypes from 'prop-types';
import {connect} from 'react-redux';
import {List, Map} from 'immutable';
import {Dropdown} from 'semantic-ui-react';
import {findKey, priorityOptions} from '../../../utils/combo-items';

class RealmSelection extends React.Component {

    handleChange = (e, {value}) => {
        const {onChange} = this.props;
        if (onChange) {
            onChange(value);
        }
    };

    render() {

        const {permissions, era} = this.props;
        const priorities = permissions.getIn([era, 'permission', 'priorities']) || List();

        const options = [];
        priorities.forEach(priority => options.push(findKey(priority, priorityOptions)));

        return <Dropdown
            selection clearable search
            options={options}
            onChange={this.handleChange}
            placeholder='تقدم'
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