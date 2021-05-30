import React, {useEffect, useState} from "react";
import { AuthConsumer } from "../auth/AuthProvider";
import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { ConversationHeader, MainContainer, ChatContainer, MessageList, Message, MessageInput, Avatar } from '@chatscope/chat-ui-kit-react';
import {ChatParentContainer} from "../../styled-components";

const Room = (props) => {
    const [friendName, setFriendName] = useState('')
    const [friendAvatarUrl, setFriendAvatarUrl] = useState('')

    const getFriendInfo = async () => {
        const res = await fetch("/api/user/friends/" + window.location.href.split('/')[4], {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        });
        const body = await res.json()
        console.log(body.name)
        setFriendName(body.name);
        setFriendAvatarUrl(body.picture)
    }

    useEffect(async () => {
        let ignore = false;

        if (!ignore) {
            await getFriendInfo()
        }
        return () => { ignore = true; }
    },[]);

    return (
      <AuthConsumer>
        {(context) => (
            <ChatParentContainer>
              <MainContainer responsive>
                <ChatContainer>
                  <ConversationHeader>
                    <Avatar src={friendAvatarUrl} name={friendName}/>
                    <ConversationHeader.Content userName={friendName}/>
                  </ConversationHeader>
                  <MessageList>
                    <Message model={{
                      message: "Hello, my friend",
                      sentTime: "just now",
                      sender: "Joe"
                    }} avatarPosition="tl">
                        <Message.Footer sentTime="19:04"/>
                        <Avatar src={friendAvatarUrl} name={friendName}/>
                    </Message>
                      <Message model={{
                          message: "How are u doing?",
                          sentTime: "just now",
                          sender: "Joe"
                      }} avatarPosition="tl">
                          <Message.Footer sentTime="19:05"/>
                          <Avatar src={friendAvatarUrl} name={friendName}/>
                      </Message>
                      <Message model={{
                          message: "Look at this wonderful picture",
                          sentTime: "just now",
                          sender: "Joe"
                      }} avatarPosition="tl">
                          <Message.Footer sentTime="19:06"/>
                          <Avatar src={friendAvatarUrl} name={friendName}/>
                      </Message>
                      <Message type="image" model={{
                          direction: "incoming",
                          message: "hello",
                          payload: {
                              src: friendAvatarUrl,
                              alt: "Avatar",
                              width: "200px"
                          }
                      }} avatarPosition="tl">
                          <Message.Footer sentTime="19:07"/>
                          <Avatar src={friendAvatarUrl} name={friendName}/>
                      </Message>
                      <Message model={{
                          direction: "outgoing",
                          message: "Wow, looks so great!",
                          sentTime: "just now",
                          sender: "Joe"
                      }} avatarPosition="tr">
                          <Message.Footer sentTime="19:08"/>
                          <Avatar src={context.user.picture} name={friendName}/>
                      </Message>
                  </MessageList>
                  <MessageInput placeholder="Type message here" />
                </ChatContainer>
              </MainContainer>
            </ChatParentContainer>
        )}
      </AuthConsumer>
    )
}

export default Room;
