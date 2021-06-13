import React, {useEffect} from "react";
import {Avatar, ConversationHeader} from "@chatscope/chat-ui-kit-react";

const ConversationHeaderWrapper = (props) => {

    const getFriendInfo = async () => {
        const res = await fetch("/api/user/friends/" + props.chatId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const body = await res.json();
        props.setFriendName(body.name);
        props.setFriendAvatarUrl(body.picture);
        props.setFriendId(body._id);
    };

    useEffect( async () =>
        await getFriendInfo()
    )

    return (
        <ConversationHeader>
            <Avatar src={props.friendAvatarUrl} name={props.friendName} />
            <ConversationHeader.Content userName={props.friendName} />
        </ConversationHeader>
    )
}

export default ConversationHeaderWrapper