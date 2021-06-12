import React, { useEffect, useRef, useState } from "react";
import { AuthConsumer } from "../auth/AuthProvider";
import {
  SendButton,
  AttachmentButton,
  Button,
  Avatar,
  ChatContainer,
  ConversationHeader,
  MainContainer,
  Message,
  MessageInput,
  MessageList,
} from "@chatscope/chat-ui-kit-react";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { ChatParentContainer } from "../../styled-components";
import { io } from "socket.io-client";

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

  const getUuid = async () => {
    const res = await fetch("/api/chat/uuid", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const body = await res.json();
    return body.uuid;
  };

  const constructNewMessage = async (userId) => {
    return {
      uuid: await getUuid(),
      body: currentMessage,
      url: "",
      senderId: userId,
      receiverId: friendId,
      chatId: chatId,
    };
  };

  const constructUpdateMessage = (userId) => {
    return {
      uuid: messageToUpdateUuid,
      body: currentMessage,
      url: "",
      senderId: userId,
      receiverId: friendId,
      chatId: chatId,
    };
  };

  const sendMessage = async (userId) => {
    if (!isEditing) {
      const message = await constructNewMessage(userId);
      socketRef.current.emit("message/new", message);
    } else {
      setEditing(false);
      const message = constructUpdateMessage(userId);
      setMessageToUpdateUuid('')
      socketRef.current.emit("message/update", message);
    }
    setCurrentMessage("");
  };

  const getJoiningData = () => {
    return {
      userId: props.user._id,
      chatId: chatId,
    };
  };

  const updateMessage = (messageUuid) => {
    setEditing(true);
    setMessageToUpdateUuid(messageUuid);
    const messageToUpdate = messages.find((message) => {
      if (message.uuid === messageUuid) return true;
    });
    setCurrentMessage(messageToUpdate.body);
  };

  const cancelEditing = async () => {
    setEditing(false)
    setCurrentMessage('')
    setMessageToUpdateUuid('')
  }

  const generateMessageJsx = (message, context) => {
    return (
      <div
        onClick={
          message.senderId === friendId
            ? null
            : () => updateMessage(message.uuid)
        }
      >
        <Message
          model={{
            direction: message.senderId === friendId ? "incoming" : "outgoing",
            message: message.body,
          }}
        >
          <Message.Footer sentTime="19:05" />
          <Avatar
            src={
              message.senderId === friendId
                ? context.user.picture
                : friendAvatarUrl
            }
            name={
              message.senderId === friendId ? context.user.name : friendName
            }
          />
        </Message>
      </div>
    );
  };

  const generateChatControlJsx = (isEditing, context) => {
    if (isEditing) {
      return (
          <>
          <Button border
              onClick={async () => {
                await sendMessage(context.user._id);
              }}
          >Обновить</Button>
            <Button border
                onClick={async () => {
                  await cancelEditing();
                }}
            >Отменить</Button>
          </>
      )
    }
    else {
      return (
          <>
          <AttachmentButton style={{
            fontSize: "1.2em",
            paddingLeft: "0.2em",
            paddingRight: "0.2em"
          }} />
          <SendButton
              onClick={async () => {
                await sendMessage(context.user._id);
              }}
              style={{
                fontSize: "1.2em",
                marginLeft: 0,
                paddingLeft: "0.2em",
                paddingRight: "0.2em"
              }}
          />
          </>
    )
    }
  }

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
                  return generateMessageJsx(message, context);
                })}
              </MessageList>
              <div as={MessageInput} style={{
                display: "flex",
                flexDirection: "row",
                borderTop: "1px dashed #d1dbe4"
              }}>
                <MessageInput
                    sendButton={false}
                    attachButton={false}
                    placeholder="Введите сообщение здесь"
                    onSend={async () => {
                      await sendMessage(context.user._id);
                    }}
                    value={currentMessage}
                    onChange={setCurrentMessage}
                    style={{
                      flexGrow: 1,
                      borderTop: 0,
                      flexShrink: "initial"
                    }}
                />
                {generateChatControlJsx(isEditing, context)}
              </div>
            </ChatContainer>
          </MainContainer>
        </ChatParentContainer>
      )}
    </AuthConsumer>
  );
};

export default Room;
