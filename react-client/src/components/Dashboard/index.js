import React from 'react'
import {connect} from "react-redux";

class Dashboard extends React.Component {

    render() {
        const {session} = this.props;

        return (<div>
            <p> this is dashboard</p>
            <p> {session.user.fullName}</p>
        </div>)
    }
}

function mapStateToProps(state) {
    return {
        session: state.users.get('session')
    }
}

export default connect(mapStateToProps)(Dashboard);