import React from 'react';
import propTypes from 'prop-types';
import EraSelection from '../../Selection/Era';
import RealmSelection from '../../Selection/Realm';
import PrioritySelection from '../../Selection/Priority';
import {
    Button,
    Form,
    Input,
    Label,
} from 'semantic-ui-react';
import TextareaAutoSize from 'react-textarea-autosize';

class AddNewForm extends React.Component {

    state = {
        era: '',
        realm: null,
        priority: null,
        title: '',
        context: '',
    };

    handleEraChange = (era) => this.setState({era, realm: null, priority: null, assignee: null});
    handleRealmChange = (realm) => this.setState({realm});
    handleTitleChange = (e, {value}) => this.setState({title: value});
    handleContextChange = (e, {value}) => this.setState({context: value});
    handlePriorityChange = (priority) => this.setState({priority});

    handleSaveButton = () => {
        const {onAdd} = this.props;
        onAdd && onAdd(this.state);
    };
    handleCancelButton = () => {
        const {onCancel} = this.props;
        onCancel && onCancel();
    };

    render() {
        const {era, title, context} = this.state;
        const {isLoading} = this.props;

        return <Form loading={isLoading}>
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
                <TextareaAutoSize
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
                    <Label>تقدم</Label>
                    <PrioritySelection era={era} onChange={this.handlePriorityChange}/>
                </Form.Field>
            </Form.Group>
            <Form.Group>
                <Form.Field>
                    <Button primary onClick={this.handleSaveButton}>
                        ذخیره
                    </Button>
                    <Button secondary onClick={this.handleCancelButton}>
                        انصراف
                    </Button>
                </Form.Field>
            </Form.Group>
        </Form>
    }
}

AddNewForm.propTypes = {
    onAdd: propTypes.func.isRequired,
    onCancel: propTypes.func.isRequired,
    isLoading: propTypes.bool,
};

AddNewForm.defaultProps = {
    isLoading: false,
};

export default AddNewForm;