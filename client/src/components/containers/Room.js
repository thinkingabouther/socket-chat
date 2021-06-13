import React, { useEffect, useRef, useState } from "react";
import { AuthConsumer } from "../auth/AuthProvider";
import {
  ConversationHeader,
  Message,
  ChatContainer,
  MainContainer,
  MessageInput,
  MessageList,
} from "@chatscope/chat-ui-kit-react";

import MessageWrapper from "../chat/MessageWrapper";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { ChatParentContainer } from "../../styled-components";
import { io } from "socket.io-client";
import ChatControlPanel from "../chat/ChatControlPanel";
import ConversationHeaderWrapper from "../chat/ConversationHeaderWrapper";

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

  useEffect(async () => {
    socketRef.current = io.connect("/");
    socketRef.current.emit("user/join", {
      userId: props.user._id,
      chatId: chatId,
    });

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
              <ConversationHeaderWrapper
                  as={ConversationHeader}
                  setFriendName={setFriendName}
                  friendName={friendName}
                  setFriendAvatarUrl={setFriendAvatarUrl}
                  friendAvatarUrl={friendAvatarUrl}
                  setFriendId={setFriendId}
                  friendId={friendId}
                  chatId={chatId}
              />
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
