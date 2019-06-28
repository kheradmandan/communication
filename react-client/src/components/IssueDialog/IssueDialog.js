import React from 'react';
import {connect} from "react-redux";
import {Button, Form, Input, Label, Modal, TextArea} from "semantic-ui-react";
import EraSelection from '../Selection/Era';
import UserSelection from '../Selection/User';
import RealmSelection from '../Selection/Realm';
import PrioritySelection from '../Selection/Priority';

class IssueDialog extends React.Component {

    state = {
        era: '',
        realm: null,
        priority: null,
        assignee: null,
        title: '',
        context: '',
    };

    handleEraChange = (era) => this.setState({era, realm: null, priority: null, assignee: null});
    handleRealmChange = (realm) => this.setState({realm});
    handleTitleChange = (e, {value}) => this.setState({title: value});
    handleContextChange = (e, {value}) => this.setState({context: value});
    handlePriorityChange = (priority) => this.setState({priority});
    handleAssigneeChange = (assignee) => this.setState({assignee});

    handleSaveButton = () => {

    };

    render() {
        const {era, title, context} = this.state;

        return (<Modal trigger={<Button>Add new </Button>} centered={false}>
                <Modal.Header>
                    بازکردن مبحث جدید
                </Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Field>
                            <Label>عنوان*</Label>
                            <Input
                                fluid
                                placeholder="عنوان مختصر*"
                                icon="bug"
                                value={title}
                                onChange={this.handleTitleChange}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Label>شرح</Label>
                            <TextArea
                                value={context}
                                onChange={this.handleContextChange}
                                placeholder="بحث"
                            />
                        </Form.Field>
                        <Form.Group>
                            <Form.Field>
                                <Label>محل</Label>
                                <EraSelection defaultValue={era} onChange={this.handleEraChange}/>
                            </Form.Field>
                            <Form.Field>
                                <Label>بخش</Label>
                                <RealmSelection era={era} onChange={this.handleRealmChange}/>
                            </Form.Field>
                            <Form.Field>

                                <Label>گیرنده</Label>
                                <UserSelection era={era} onChange={this.handleAssigneeChange}/>
                            </Form.Field>
                            <Form.Field>
                                <Label>تقدم</Label>
                                <PrioritySelection era={era} onChange={this.handlePriorityChange}/>
                            </Form.Field>
                        </Form.Group>
                        <Form.Group>
                            <Form.Field>
                                <Button primary>
                                    ذخیره
                                </Button>
                                <Button secondary>
                                    انصراف
                                </Button>
                            </Form.Field>
                        </Form.Group>
                    </Form>
                </Modal.Content>
            </Modal>
        )
    }
}

function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps)(IssueDialog);