import React, { useEffect, useRef, useState } from "react";
import { AuthConsumer } from "../auth/AuthProvider";
import {
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
  const [isEditing, setEditing] = useState(false)
  const [messageToUpdateUuid, setMessageToUpdateUuid] = useState("")
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
      chatId: chatId
    }
  }

  const sendMessage = async (userId) => {
    if (!isEditing) {
      const message = await constructNewMessage(userId);
      socketRef.current.emit("message/new", message);
    }
    else {
      setEditing(false)
      const message = constructUpdateMessage(userId)
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
    setEditing(true)
    setMessageToUpdateUuid(messageUuid)
    const messageToUpdate = messages.find((message) => {
      if (message.uuid === messageUuid) return true
    })
    setCurrentMessage(messageToUpdate.body)
  }

  const generateMessageJsx = (message, context) => {
      return (
          <div onClick={message.senderId === friendId ? null : () => updateMessage(message.uuid)}>
            <Message
                model={{
                  direction: message.senderId === friendId ? 'incoming' : 'outgoing',
                  message: message.body,
                }}
            >
              <Message.Footer sentTime="19:05" />
              <Avatar
                  src={message.senderId === friendId ? context.user.picture : friendAvatarUrl}
                  name={message.senderId === friendId ? context.user.name : friendName}
              />
            </Message>
          </div>
      )
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
                  return generateMessageJsx(message, context)
                })}
              </MessageList>
              <MessageInput
                placeholder="Type message here"
                onSend={async () => {
                  await sendMessage(context.user._id);
                }}
                value={currentMessage}
                onChange={setCurrentMessage}
              />
            </ChatContainer>
          </MainContainer>
        </ChatParentContainer>
      )}
    </AuthConsumer>
  );
};

export default Room;
