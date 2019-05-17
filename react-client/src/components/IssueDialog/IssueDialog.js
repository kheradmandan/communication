import React from 'react';
import {connect} from "react-redux";
import {Button, Form, Input, Modal, TextArea} from "semantic-ui-react";
import Selection from "../Selection";

class IssueDialog extends React.Component {

    render() {
        const {permissions} = this.props;
        return (<Modal trigger={<Button>Add new </Button>} centered={false}>
            <Modal.Header>
                اعلام مشکل
            </Modal.Header>
            <Modal.Content>
                <Form>
                    <Input
                        fluid
                        placeholder="title"
                        icon="bug"
                    />
                    <TextArea placeholder="exp"/>

                    <Modal.Content>
                        <Selection options={permissions.get('xref-users-origins')} modelName='Origin'/>
                    </Modal.Content>

                    <Modal.Actions>
                        <Button primary>
                            ذخیره
                        </Button>
                        <Button secondary>
                            انصراف
                        </Button>
                    </Modal.Actions>
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