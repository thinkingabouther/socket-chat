import React, { useState } from "react";
import { Loader, Button, MessageInput, SendButton } from "@chatscope/chat-ui-kit-react";
import FileUploader from "./FileUploader";
import {
  constructMessageWithImage,
  constructUpdateMessage,
  constructNewMessage,
} from "./MessageFactory";

const ChatControlPanel = (props) => {
  const [isImageLoaded, setImageLoaded] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [isImageLoading, setImageLoading] = useState(false)

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

  const cancelSending = () => {
    setImageLoaded(false)
  }

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
        value={
          isImageLoaded ? "Изображение готово к отправке" : props.currentMessage
        }
        onChange={isImageLoaded ? null : props.setCurrentMessage}
        disabled={isImageLoaded}
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
            { isImageLoaded ?
                <Button
                    border
                    onClick={() => {cancelSending()}}
                >
                  Отменить
                </Button> :
                <FileUploader
                    setImageUrl={setImageUrl}
                    setImageLoaded={setImageLoaded}
                    setImageLoading={setImageLoading}
                />
            }
            { isImageLoading ?
                <Loader
                    style={{
                        fontSize: "1em",
                        marginLeft: 0,
                        marginTop: "0.5em"
                    }}
                /> :
                <SendButton
                    onClick={async () => {
                        await sendMessage(props.context.user._id);
                    }}
                    disabled={!isImageLoaded && props.currentMessage === ""}
                    style={{
                        fontSize: "1.2em",
                        marginLeft: 0,
                        paddingLeft: "0.2em",
                        paddingRight: "0.2em",
                    }}
                />
            }
        </>
      )}
    </div>
  );
};
export default ChatControlPanel;
