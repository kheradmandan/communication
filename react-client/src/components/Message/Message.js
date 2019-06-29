import React from 'react';
import {connect} from "react-redux";
import propTypes from 'prop-types';
import {List} from "immutable";
import * as actions from '../../services/messages';
import {
    Button,
    Header, Icon,
    Message,
    Modal,
} from "semantic-ui-react";

class Messages extends React.Component {

    render() {
        const {messages, removeMessageByType, clearMessages} = this.props;
        if (!messages || 0 === messages.count()) {
            return null;
        }

        let messageItems = [];
        messages
            .groupBy(x => x.get('type'))
            .forEach(items =>
                messageItems.push(
                    <OneMessage
                        key={'top-' + items.first().get('type')}
                        type={items.first().get('type')}
                        list={items}
                        removeMessageByType={removeMessageByType}
                    />
                ));

        return <Modal open={messageItems.length} basic size='small'>
            <Header icon='browser' content='پیام ها'/>
            <Modal.Content>
                {messageItems}
            </Modal.Content>
            <Modal.Actions>
                <Button icon inverted
                        color='green'
                        content='Home'
                        onClick={clearMessages}>
                    <Icon name='checkmark'/>
                    بستن
                </Button>

            </Modal.Actions>
        </Modal>
    }
}

Messages.propTypes = {
    messages: propTypes.object,
    clearMessages: propTypes.func.isRequired,
    removeMessage: propTypes.func.isRequired,
    removeMessageByType: propTypes.func.isRequired,
};

Messages.defaultProps = {
    messages: List(),
};

function mapStateToProps(state) {
    return {
        messages: state.messages,
    }
}

export default connect(mapStateToProps, actions)(Messages);


function OneMessage({type, list, removeMessageByType}) {
    let messageType = {};

    if ('error' === type) {
        messageType = {
            negative: true,
            icon: 'stop circle',
            header: 'خطا',
        };
    } else if ('warn' === type) {
        messageType = {
            warning: true,
            icon: 'warning',
            header: 'هشدار',
        };
    } else {
        messageType = {
            positive: true,
            icon: 'info',
            header: 'اطلاع',
        };
    }

    const handleCloseClick = () => {
        removeMessageByType(type);
    };

    return <Message
        {...messageType}
        key={type}
        onDismiss={handleCloseClick}
        list={
            list.map(message =>
                <Message.List
                    key={message.get('id')}
                >
                    {message.get('message')}
                </Message.List>)
                .toJS()
        }
    />;
}