import React from 'react';
import {connect} from "react-redux";
import propTypes from 'prop-types';
import {List} from "immutable";
import {Message} from "semantic-ui-react";
import * as messageActions from '../../services/messages';

class Messages extends React.Component {
    render() {
        const {messages, removeMessageByType} = this.props;
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
        return <div>{messageItems}</div>
    }
}

Messages.propTypes = {
    messages: propTypes.object,
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

export default connect(mapStateToProps, messageActions)(Messages);


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