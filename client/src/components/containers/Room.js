import React, {useEffect, useRef, useState} from "react";
import {AuthConsumer} from "../auth/AuthProvider";
import {
    Avatar,
    ChatContainer,
    ConversationHeader,
    MainContainer,
    Message,
    MessageInput,
    MessageList
} from '@chatscope/chat-ui-kit-react';
import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {ChatParentContainer} from "../../styled-components";
import {io} from "socket.io-client";

const Room = (props) => {
    const [friendName, setFriendName] = useState('')
    const [friendAvatarUrl, setFriendAvatarUrl] = useState('')
    const [friendId, setFriendId] = useState('')
    const socketRef = useRef();
    const [messages, setMessages] = useState([])
    const [currentMessage, setCurrentMessage] = useState('')
    const chatId = window.location.href.split('/')[4];
    const getFriendInfo = async () => {
        const res = await fetch("/api/user/friends/" + chatId, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        });
        const body = await res.json()
        setFriendName(body.name);
        setFriendAvatarUrl(body.picture);
        setFriendId(body._id)
    }

    const getUuid = async () => {
        const res = await fetch("/api/chat/uuid", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const body = await res.json()
        return body.uuid;
    }
    const constructMessage = async (userId) => {
        return {
            uuid: await getUuid(),
            body: currentMessage,
            url: '',
            senderId: userId,
            receiverId: friendId,
            chatId: chatId
        };
    }

    const sendMessage = async (userId) => {
        const message = await constructMessage(userId)
        setCurrentMessage('')
        socketRef.current.emit("message/new", message)
    }

    const getJoiningData = () => {
        return {
            userId: props.user._id,
            chatId: chatId
        }
    }

    useEffect(async () => {
        await getFriendInfo();
        socketRef.current = io.connect("/")
        socketRef.current.emit('user/join', getJoiningData())

        socketRef.current.on('message/all', message => {
            setMessages(message)
        })
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
                      {messages.map((message) => {
                          if (message.senderId !== friendId) {
                              return <Message model={{
                                  direction: "outgoing",
                                  message: message.body,
                              }}>
                                  <Message.Footer sentTime="19:05"/>
                                  <Avatar src={context.user.picture} name={context.user.name}/>
                              </Message>
                          }
                          else {
                              return <Message model={{
                                  direction: "incoming",
                                  message: message.body,
                              }}>
                                  <Message.Footer sentTime="19:05"/>
                                  <Avatar src={friendAvatarUrl} name={friendName}/>
                              </Message>
                          }
                      })}
                  </MessageList>
                  <MessageInput
                      placeholder="Type message here"
                      onSend={async () => {await sendMessage(context.user._id)}}
                      value={currentMessage}
                      onChange={setCurrentMessage}
                  />
                </ChatContainer>
              </MainContainer>
            </ChatParentContainer>
        )}
      </AuthConsumer>
    )
}

export default Room;
