import React from 'react';
import propTypes from 'prop-types';
import {Map} from 'immutable';
import {connect} from 'react-redux';
import AddNewForm from '../AddNewForm';
import ChangeAssignee from '../ChangeAssignee/ChangeAssginee';
import * as services from '../../../services/issues';
import * as requestTypes from '../../../constants/request.types';
import {
    Button,
    Modal
} from 'semantic-ui-react';

class IssueDialog extends React.Component {
    state = {
        showModal: false,
        assignee: {},
        issue: {},
        err: null,
    };

    handleCloseAction = () => this.setState({showModal: false});

    handleModalTrigger = () => {
        this.setState({showModal: !this.state.showModal});
        this.props.updateDraft();
    };

    handleIssueFormChange = (name, value) => {
        const {issue, err} = this.state;
        if (name === 'era') {
            this.setState({issue: {era: value, title: issue.title, context: issue.context}});
        } else {
            issue[name] = value;
            this.setState({issue});
        }
        if (err) {
            this.validateNewIssue();
        }
    };

    validateNewIssue = () => {
        const {issue} = this.state;
        let err = null;
        if (!issue.title || issue.title.length < 3 || issue.title.length > 128) {
            err = {...err, title: true}
        }
        if (!issue.era) {
            err = {...err, era: true}
        }
        if (!issue.realm && issue.realm !== 0) {
            err = {...err, realm: true}
        }
        if (!issue.priority && issue.priority !== 0) {
            err = {...err, priority: true}
        }
        this.setState({err});
        return !err
    };

    handleIssueAdd = () => {
        if (this.validateNewIssue()) {
            const {addIssue} = this.props;
            addIssue && addIssue(this.state.issue)
        }
    };


    handleChangeAssignee = assignee => this.setState({assignee});

    handleChangeAssignee3 = (user, title) => {
        const {draft} = this.props;
        const issueId = draft && draft.get('_id');
        if (issueId) {
            this.props.changeAssignee(issueId, user, title);
            this.setState({showModal: false});
            this.props.updateDraft();
        }
    };

    render() {
        const {showModal, issue, err} = this.state;
        const {isAddingIssue, isChangingAssignee, draft} = this.props;

        let innerComponent;
        let saveButton;
        const isSaveOk = draft.get('Ok');
        if (isSaveOk) {
            innerComponent = <ChangeAssignee
                loading={isChangingAssignee}
                era={draft.get('era')}
                issue={draft.get('_id')}
                onChange={this.handleChangeAssignee}
            />
        } else {
            innerComponent = <AddNewForm
                {...issue}
                err={err || {}}
                loading={isAddingIssue}
                onChange={this.handleIssueFormChange}
            />;
            saveButton = <Button
                primary
                onClick={this.handleIssueAdd}>
                ذخیره
            </Button>
        }

        return (
            <Modal
                open={showModal} dimmer='blurring' closeIcon closeOnEscape={false} closeOnDimmerClick={false}
                onClose={this.handleCloseAction}
                trigger={
                    <Button circular positive icon='add'
                            onClick={this.handleModalTrigger}
                            content='افزودن'/>
                }>
                <Modal.Header>
                    مبحث جدید
                </Modal.Header>
                <Modal.Content>
                    {innerComponent}
                </Modal.Content>
                <Modal.Actions>
                    {saveButton}
                    <Button secondary onClick={this.handleCloseAction}>
                        انصراف
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

IssueDialog.propTypes = {
    draft: propTypes.instanceOf(Map).isRequired,
    updateDraft: propTypes.func.isRequired,
    changeAssignee: propTypes.func.isRequired,
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