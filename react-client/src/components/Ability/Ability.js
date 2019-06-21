import React from 'react';
import {List, Map} from 'immutable';
import {connect} from 'react-redux';
import propTypes from "prop-types";

class Ability extends React.Component {

    render() {
        const {current, permissions, can, children} = this.props;
        const roles = permissions || current.get('permissions') || List();

        if (roles.some(x => x === can)) {
            return children;
        }
        return null;
    }
}

Ability.propTypes = {
    can: propTypes.string.isRequired,
    current: propTypes.instanceOf(Map),
    permissions: propTypes.instanceOf(List),
};

Ability.defaultProps = {
    can: null,
    current: Map(),
    permissions: null,
};

function mapStateToProps(state) {
    return {
        current: state.issues.get('current'),
    }
}

export default connect(mapStateToProps)(Ability);