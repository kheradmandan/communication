import React from 'react';
import propTypes from 'prop-types';
import EraSelection from '../../Selection/Era';
import RealmSelection from '../../Selection/Realm';
import PrioritySelection from '../../Selection/Priority';
import {
    Form,
    Input,
    TextArea,
} from 'semantic-ui-react';

class AddNewForm extends React.Component {

    handleEraChange = era => this.props.onChange('era', era);
    handleRealmChange = realm => this.props.onChange('realm', realm);
    handleTitleChange = (e, {value}) => this.props.onChange('title', value);
    handleContextChange = (e, {value}) => this.props.onChange('context', value);
    handlePriorityChange = priority => this.props.onChange('priority', priority);

    render() {
        const {era, title, context, err, loading} = this.props;

        return <Form loading={loading}>
            <Form.Field
                control={Input}
                error={err.title}
                required
                fluid
                icon="bug"
                label="عنوان"
                placeholder="عنوان مختصر"
                value={title}
                onChange={this.handleTitleChange}
            />
            <Form.Field
                control={TextArea}
                error={err.context}
                label="شرح"
                placeholder="بحث"
                value={context}
                useCacheForDOMMeasurements
                onChange={this.handleContextChange}
            />
            <Form.Group>
                <Form.Field
                    control={EraSelection}
                    error={err.era}
                    required
                    label="محل"
                    defaultValue={era}
                    onChange={this.handleEraChange}
                />
                <Form.Field
                    control={RealmSelection}
                    error={err.realm}
                    required
                    label="بخش"
                    era={era}
                    onChange={this.handleRealmChange}
                />
                <Form.Field
                    control={PrioritySelection}
                    error={err.priority}
                    required
                    label="تقدم"
                    era={era}
                    onChange={this.handlePriorityChange}
                />
            </Form.Group>
        </Form>
    }
}

AddNewForm.propTypes = {
    onChange: propTypes.func.isRequired,
    loading: propTypes.bool,
    era: propTypes.string.isRequired,
    title: propTypes.string,
    context: propTypes.string,
};

AddNewForm.defaultProps = {
    loading: false,
    title: '',
    context: '',
};

export default AddNewForm;