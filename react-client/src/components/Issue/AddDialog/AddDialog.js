import React from 'react';
import ChangeAssignee from '../ChangeAssignee/ChangeAssginee';
import propTypes from 'prop-types';
import {Map} from 'immutable';
import {connect} from 'react-redux';
import AddNewForm from '../AddNewForm';
import * as services from '../../../services/issues';
import * as requestTypes from '../../../constants/request.types';
import {
    Button,
    Modal
} from 'semantic-ui-react';

class IssueDialog extends React.Component {
    state = {showModal: false};

    handleCancelNew = () => this.setState({showModal: false});
    handleAddButton = () => {
        this.setState({showModal: !this.state.showModal});
        this.props.updateDraft();
    };

    render() {
        const {showModal} = this.state;
        const {isAddingIssue, isChangingAssignee, draft, addIssue, changeAssignee} = this.props;

        let innerComponent;
        const isSaveOk = draft.get('Ok');
        if (isSaveOk) {
            innerComponent = <ChangeAssignee
                loading={isChangingAssignee}
                era={draft.get('era')}
                issue={draft.get('_id')}
                onChange={changeAssignee}
                onCancel={this.handleCancelNew}
            />
        } else {
            innerComponent = <AddNewForm
                loading={isAddingIssue}
                onAdd={addIssue}
                onCancel={this.handleCancelNew}
            />
        }

        return (
            <Modal open={showModal}
                   trigger={
                       <Button circular positive icon='add'
                               onClick={this.handleAddButton}
                               content='افزودن'/>
                   }>
                <Modal.Header>
                    مبحث جدید
                </Modal.Header>
                <Modal.Content>
                    {innerComponent}
                </Modal.Content>
            </Modal>
        )
    }
}

IssueDialog.propTypes = {
    draft: propTypes.instanceOf(Map).isRequired,
    updateDraft: propTypes.func.isRequired,
    isAddingIssue: propTypes.bool,
    isChangingAssignee: propTypes.bool,
};

IssueDialog.defaultProps = {
    draft: Map(),
    isAddingIssue: false,
    isChangingAssignee: false,
};

function mapStateToProps(state) {
    return {
        draft: state.issues.get('draft'),
        isAddingIssue: state.requests.get(requestTypes.ADD_ISSUE),
        isChangingAssignee: state.requests.get(requestTypes.CHANGE_ASSIGNEE),
    }
}

export default connect(mapStateToProps, services)(IssueDialog);