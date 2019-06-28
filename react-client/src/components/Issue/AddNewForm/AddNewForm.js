import React from 'react';
import propTypes from 'prop-types';
import EraSelection from '../../Selection/Era';
import RealmSelection from '../../Selection/Realm';
import PrioritySelection from '../../Selection/Priority';
import {
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

    handleEraChange = (era) => {
        this.setState({era, realm: null, priority: null, assignee: null});
        this.props.onAdd(this.state);
    };
    handleRealmChange = (realm) => {
        this.setState({realm});
        this.props.onAdd(this.state);
    };
    handleTitleChange = (e, {value}) => {
        this.setState({title: value});
        this.props.onAdd(this.state);
    };
    handleContextChange = (e, {value}) => {
        this.setState({context: value});
        this.props.onAdd(this.state);
    };
    handlePriorityChange = (priority) => {
        this.setState({priority});
        this.props.onAdd(this.state);
    };

    handleSaveButton = () => {
        const {onAdd} = this.props;
        onAdd && onAdd(this.state);
    };

    render() {
        const {era, title, context} = this.state;
        const {loading} = this.props;

        return <Form loading={loading}>
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
        </Form>
    }
}

AddNewForm.propTypes = {
    onAdd: propTypes.func.isRequired,
    loading: propTypes.bool,
};

AddNewForm.defaultProps = {
    loading: false,
};

export default AddNewForm;