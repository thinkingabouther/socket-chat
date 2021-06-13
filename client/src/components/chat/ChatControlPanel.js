import React, { useState } from "react";
import { Button, MessageInput, SendButton } from "@chatscope/chat-ui-kit-react";
import FileUploader from "./FileUploader";
import {
  constructMessageWithImage,
  constructUpdateMessage,
  constructNewMessage,
} from "./MessageFactory";

const ChatControlPanel = (props) => {
  const [isImageLoaded, setImageLoaded] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  const sendMessage = async (userId) => {
    if (isImageLoaded) {
      const message = await constructMessageWithImage(
        userId,
        imageUrl,
        props.friendId,
        props.chatId
      );
      props.socketRef.current.emit("message/new", message);
      setImageUrl(null);
      setImageLoaded(false);
      return;
    }
    if (!props.isEditing) {
      const message = await constructNewMessage(
        userId,
        props.currentMessage,
        props.friendId,
        props.chatId
      );
      props.socketRef.current.emit("message/new", message);
    } else {
      props.setEditing(false);
      const message = constructUpdateMessage(
        userId,
        props.messageToUpdateUuid,
        props.currentMessage,
        props.friendId,
        props.chatId
      );
      props.setMessageToUpdateUuid("");
      props.socketRef.current.emit("message/update", message);
    }
    props.setCurrentMessage("");
  };

  const cancelEditing = async () => {
    props.setEditing(false);
    props.setCurrentMessage("");
    props.setMessageToUpdateUuid("");
  };

  return (
    <div
      as={MessageInput}
      style={{
        display: "flex",
        flexDirection: "row",
        borderTop: "1px dashed #d1dbe4",
      }}
    >
      <MessageInput
        sendButton={false}
        attachButton={false}
        placeholder="Введите сообщение здесь"
        onSend={async () => {
          await sendMessage(props.context.user._id);
        }}
        value={props.currentMessage}
        onChange={props.setCurrentMessage}
        style={{
          flexGrow: 1,
          borderTop: 0,
          flexShrink: "initial",
        }}
      />
      {props.isEditing ? (
        <>
          <Button
            border
            onClick={async () => {
              await sendMessage(props.context.user._id);
            }}
          >
            Обновить
          </Button>
          <Button
            border
            onClick={async () => {
              await cancelEditing();
            }}
          >
            Отменить
          </Button>
        </>
      ) : (
        <>
          <FileUploader
            setImageUrl={setImageUrl}
            setImageLoaded={setImageLoaded}
          />
          <SendButton
            onClick={async () => {
              await sendMessage(props.context.user._id);
            }}
            style={{
              fontSize: "1.2em",
              marginLeft: 0,
              paddingLeft: "0.2em",
              paddingRight: "0.2em",
            }}
          />
        </>
      )}
    </div>
  );
};

export default ChatControlPanel;
