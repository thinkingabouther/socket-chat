import {Avatar, Message} from "@chatscope/chat-ui-kit-react";
import React from "react";

const MessageWrapper = props => {
    if (props.message.url !== "") {
        return (
            <Message
                type="image"
                model={{
                    direction: props.message.senderId === props.friendId ? "incoming" : "outgoing",
                    payload: {
                        src: props.message.url,
                        alt: "message_image",
                        width: "200px",
                    },
                }}
            >
                <Message.Footer sentTime="19:05" />
                <Avatar
                    src={
                        props.message.senderId === props.friendId
                            ? props.friendAvatarUrl
                            : props.context.user.picture
                    }
                    name={
                        props.message.senderId === props.friendId ? props.friendName : props.context.user.name
                    }
                />
            </Message>
        );
    }

    return (
        <div
            onClick={
                props.message.senderId === props.friendId
                    ? null
                    : () => props.updateMessage(props.message.uuid)
            }
        >
            <Message
                model={{
                    direction: props.message.senderId === props.friendId ? "incoming" : "outgoing",
                    message: props.message.body,
                }}
            >
                <Message.Footer sentTime="19:05" />
                <Avatar
                    src={
                        props.message.senderId === props.friendId
                            ? props.friendAvatarUrl
                            : props.context.user.picture
                    }
                    name={
                        props.message.senderId === props.friendId ? props.friendName : props.context.user.name
                    }
                />
            </Message>
        </div>
    );
}

export default MessageWrapper