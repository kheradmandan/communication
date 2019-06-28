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
        const {permissions, defaultValue} = this.props;

        const options = [];
        permissions.mapKeys((_id, era) => options.push({
            id: _id,
            value: _id,
            text: `${era.getIn(['origin', 'title'])}/${era.get('title')}`
        }));

        return <Dropdown
            openOnFocus
            selection clearable search
            defaultValue={defaultValue}
            options={options}
            onChange={this.handleChange}
            placeholder='دوره'
        />
    }
}

EraSelection.proptTypes = {
    onChange: propTypes.func,
    permissions: propTypes.instanceOf(Map).isRequired,
    defaultValue: propTypes.string,
};

EraSelection.defaultProps = {
    permissions: Map(),
    defaultValue: '',
};

function mapStateToProps(state) {
    return {
        permissions: state.permissions
    }
}

export default connect(mapStateToProps)(EraSelection);