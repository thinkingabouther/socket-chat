import React, { useEffect, useRef, useState } from "react";
import { AuthConsumer } from "../auth/AuthProvider";
import {
  Message,
  Avatar,
  ChatContainer,
  ConversationHeader,
  MainContainer,
  MessageInput,
  MessageList,
} from "@chatscope/chat-ui-kit-react";

import MessageWrapper from "../chat/MessageWrapper";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { ChatParentContainer } from "../../styled-components";
import { io } from "socket.io-client";
import ChatControlPanel from "../chat/ChatControlPanel";

const Room = (props) => {
  const [friendName, setFriendName] = useState("");
  const [friendAvatarUrl, setFriendAvatarUrl] = useState("");
  const [isEditing, setEditing] = useState(false);
  const [messageToUpdateUuid, setMessageToUpdateUuid] = useState("");
  const [friendId, setFriendId] = useState("");
  const socketRef = useRef();
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const chatId = window.location.href.split("/")[4];

  const getFriendInfo = async () => {
    const res = await fetch("/api/user/friends/" + chatId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const body = await res.json();
    setFriendName(body.name);
    setFriendAvatarUrl(body.picture);
    setFriendId(body._id);
  };

  const getJoiningData = () => {
    return {
      userId: props.user._id,
      chatId: chatId,
    };
  };

  useEffect(async () => {
    await getFriendInfo();
    socketRef.current = io.connect("/");
    socketRef.current.emit("user/join", getJoiningData());

    socketRef.current.on("message/all", (message) => {
      setMessages(message);
    });
  }, []);

  return (
    <AuthConsumer>
      {(context) => (
        <ChatParentContainer>
          <MainContainer responsive>
            <ChatContainer>
              <ConversationHeader>
                <Avatar src={friendAvatarUrl} name={friendName} />
                <ConversationHeader.Content userName={friendName} />
              </ConversationHeader>
              <MessageList>
                {messages.map((message) => {
                  return (
                    <MessageWrapper
                      key={message.uuid}
                      as={Message}
                      message={message}
                      messages={messages}
                      friendId={friendId}
                      friendAvatarUrl={friendAvatarUrl}
                      friendName={friendName}
                      context={context}
                      setEditing={setEditing}
                      setMessageToUpdateUuid={setMessageToUpdateUuid}
                      setCurrentMessage={setCurrentMessage}
                    />
                  );
                })}
              </MessageList>
              <ChatControlPanel
                  as={MessageInput}
                  context={context}
                  setCurrentMessage={setCurrentMessage}
                  currentMessage={currentMessage}
                  socketRef={socketRef}
                  isEditing={isEditing}
                  setEditing={setEditing}
                  messageToUpdateUuid={messageToUpdateUuid}
                  setMessageToUpdateUuid={setMessageToUpdateUuid}
                  friendId={friendId}
                  chatId={chatId}
              />
            </ChatContainer>
          </MainContainer>
        </ChatParentContainer>
      )}
    </AuthConsumer>
  );
};

export default Room;
