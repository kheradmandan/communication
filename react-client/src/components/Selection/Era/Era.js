import React from 'react';
import propTypes from 'prop-types';
import {connect} from 'react-redux';
import {Map} from 'immutable';
import {Dropdown} from 'semantic-ui-react';

class EraSelection extends React.Component {

    handleChange = (e, {value}) => {
        const {onChange} = this.props;
        if (onChange) {
            onChange(value);
        }
    };

    render() {
        const {permissions} = this.props;
        const options = permissions.mapKeys((_id, era) => ({id: _id, value: _id, text: _id}));

        return <Dropdown
            openOnFocus
            selection clearable
            options={options}
            onChange={this.handleChange}
            placeholder='گیرنده'
        />
    }
}

EraSelection.proptTypes = {
    era: propTypes.string.isRequired,
    onChange: propTypes.func,
    permissions: propTypes.instanceOf(Map).isRequired,
};

EraSelection.defaultProps = {
    era: '',
    permissions: Map(),
};

function mapStateToProps(state) {
    return {
        permissions: state.permissions
    }
}

export default connect(mapStateToProps)(EraSelection);