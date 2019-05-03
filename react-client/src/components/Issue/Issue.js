import React from 'react';
import {connect} from "react-redux";
import propTypes from 'prop-types';
import {Map} from "immutable";
import * as issueActions from '../../actions/issues';
import IssueMainData from "../IssueMainData";

class Issue extends React.Component {
    state = {uuid: ''};

    componentDidMount() {
        const {match, current} = this.props;
        if (match && match.params && match.params.uuid) {
            const uuid = match.params.uuid;
            if (uuid !== current.get('uuid')) {
                this.props.getIssueDetails(uuid);
            }
        }
    }

    render() {
        const {current} = this.props;

        return <div>
            <IssueMainData issue={current}/>
        </div>
    }
}

Issue.propTypes = {
    current: propTypes.object,
    getIssueDetails: propTypes.func.isRequired,
};

Issue.defaultProps = {
    current: Map()
};

function mapStateToProps(state) {
    return {
        current: state.issues.get('current')
    }
}

export default connect(mapStateToProps, issueActions)(Issue);