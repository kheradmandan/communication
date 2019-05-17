import React from 'react';
import {connect} from "react-redux";
import {Button, Form, Input, Label, Modal, TextArea} from "semantic-ui-react";
import Selection from "../Selection";
import RealmSelection from "../RealmSelection";

class IssueDialog extends React.Component {

    state = {
        Origin: 0,
        Realm: 0,
        Priority: 0,
    };

    handleSelectionChange = (e, {name, value}) => {
        const newState = {[name]: value};
        if (name === 'Origin') {
            newState.Realm = 0;
        }
        this.setState(newState);
    };

    render() {
        const {permissions} = this.props;
        const {Origin, Realm, Priority} = this.state;

        return (<Modal trigger={<Button>Add new </Button>} centered={false}>
            <Modal.Header>
                اعلام مشکل
            </Modal.Header>
            <Modal.Content>
                <Form>
                    <Form.Field>
                        <Label>عنوان*</Label>
                        <Input
                            fluid
                            placeholder="عنوان مختصر*"
                            icon="bug"
                        />
                    </Form.Field>
                    <Form.Field>
                        <Label>شرح</Label>
                        <TextArea placeholder="شرح مسأله"/>
                    </Form.Field>
                    <Form.Group>
                        <Form.Field>
                            <Label>محل</Label>
                            <Selection defaultValue={Origin}
                                       options={permissions.get('xref-users-origins')}
                                       modelName='Origin'
                                       onSelection={this.handleSelectionChange}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Label>بخش</Label>
                            <RealmSelection defaultValue={Realm}
                                            originId={Origin}
                                            onSelection={this.handleSelectionChange}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Label>اولویت</Label>
                            <Selection defaultValue={Priority}
                                       options={permissions.get('xref-users-origins')}
                                       modelName='Priority'
                                       onSelection={this.handleSelectionChange}
                            />
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

        </Modal>)
    }
}

function mapStateToProps(state) {
    return {
        drafts: state.drafts,
        permissions: state.permissions,
    }
}

export default connect(mapStateToProps)(IssueDialog);