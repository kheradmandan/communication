import React from 'react';
import propTypes from 'prop-types';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';
import {Map} from 'immutable';
import EraSelection from '../Selection/Era';
import RealmSelection from '../Selection/Realm';
import ChangeAssignee from '../Issue/ChangeAssignee';
import PrioritySelection from '../Selection/Priority';
import * as services from '../../services/issues';
import * as requestTypes from '../../constants/request.types';
import {
    Button,
    Container, Form, Input, Message, TextArea
} from 'semantic-ui-react';

export class AddNewIssue extends React.Component {

    state = {
        error: null
    };

    handleEraChange = era => {
        this.setState({era});
        if (this.state.errors) this.validateNewIssue();
    };
    handleUserChange = (name, value) => {
        const user = this.state.user || {};
        user[name] = value;
        this.setState({user});
        if (this.state.errors) this.validateNewIssue();
    };
    handleRealmChange = realm => {
        this.setState({realm});
        if (this.state.errors) this.validateNewIssue();
    };
    handleTitleChange = (e, {value}) => {
        this.setState({title: value});
        if (this.state.errors) this.validateNewIssue();
    };
    handleContextChange = (e, {value}) => {
        this.setState({context: value});
        if (this.state.errors) this.validateNewIssue();
    };
    handlePriorityChange = priority => {
        this.setState({priority});
        if (this.state.errors) this.validateNewIssue();
    };
    validateNewIssue = () => {
        const issue = this.state;
        let errors = null;
        if (!issue.title || issue.title.length < 3 || issue.title.length > 128) {
            errors = {...errors, title: true}
        }
        if (!issue.era) {
            errors = {...errors, era: true}
        }
        if (!issue.realm && issue.realm !== 0) {
            errors = {...errors, realm: true}
        }
        if (!issue.priority && issue.priority !== 0) {
            errors = {...errors, priority: true}
        }
        if (!issue.user || !issue.user.user || !issue.user.title) {
            errors = {...errors, user: true}
        }
        this.setState({errors});
        return !errors
    };

    handleOnSaveButton = () => {
        if (this.validateNewIssue()) {
            const {addIssue} = this.props;
            addIssue && addIssue(this.state);
        }
    };

    render() {
        const {isAddingIssue, isChangingAssignee, draft} = this.props;
        const {era, title, context, user} = this.state;
        const errors = this.state.errors || {};

        const isSaveOk = draft.get('Ok') || false;
        if (isSaveOk) {
            const issueId = draft.get('_id');
            const userId = this.state.user.user;
            const title = this.state.user.title;
            if (issueId && userId && title && !isChangingAssignee) {
                this.props.changeAssignee(issueId, userId, title);
            }
            this.props.updateDraft();// reset drafts
            return <Redirect to={`/issue/${issueId}`}/> // redirect to view details
        }

        return <Container>
            <Message attached color='teal'
                     icon='bug'
                     header="گشودن بحث جدید"
                     list={[
                         "در قسمت «عنوان» از کلمات کلیدی و پر کاربرد استفاده نمایید.",
                         "شرح آن چیزی که مد نظر است بصورت کامل و گویا بیان شود.",
                         "شماره درخواست و کد نوسازی نیز درج گردد.",
                         "از بیان جملات سلام و احوال پرسی خودداری شود."
                     ]}
            />
            <Form loading={isAddingIssue} className='attached fluid segment'>
                <Form.Field
                    control={Input}
                    error={errors.title}
                    required
                    fluid
                    icon="bug"
                    label="عنوان"
                    placeholder="کلمات کلیدی مرتبط"
                    value={title}
                    onChange={this.handleTitleChange}
                />
                <Form.Field
                    control={TextArea}
                    error={errors.context}
                    rows={8}
                    label="شرح"
                    placeholder="توضیحات کامل"
                    value={context}
                    useCacheForDOMMeasurements
                    onChange={this.handleContextChange}
                />
                <Form.Group>
                    <Form.Field
                        control={EraSelection}
                        error={errors.era}
                        required
                        label="محل"
                        defaultValue={era}
                        onChange={this.handleEraChange}
                    />
                    <Form.Field
                        control={RealmSelection}
                        error={errors.realm}
                        required
                        label="بخش"
                        era={era}
                        onChange={this.handleRealmChange}
                    />
                    <Form.Field
                        control={PrioritySelection}
                        error={errors.priority}
                        required
                        label="تقدم"
                        era={era}
                        onChange={this.handlePriorityChange}
                    />
                    <Form.Field
                        control={ChangeAssignee}
                        error={errors.user}
                        era={era}
                        {...user}
                        onChange={this.handleUserChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Button type='submit' icon='save'
                            positive
                            onClick={this.handleOnSaveButton}
                            content="ذخیره"
                    />
                </Form.Group>
            </Form>
        </Container>
    }
}

AddNewIssue.propTypes = {
    addIssue: propTypes.func.isRequired,
    updateDraft: propTypes.func.isRequired,
    changeAssignee: propTypes.func.isRequired,
    draft: propTypes.instanceOf(Map),
    isAddingIssue: propTypes.bool,
    isChangingAssignee: propTypes.bool,
};

AddNewIssue.defaultProps = {
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

export default connect(mapStateToProps, services)(AddNewIssue);