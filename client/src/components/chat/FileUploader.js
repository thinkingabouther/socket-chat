import {AttachmentButton} from "@chatscope/chat-ui-kit-react";
import React, {useRef} from "react";

const FileUploader = (props) => {

    const file = useRef(null);

    const uploadFile = () => {
        file.current.click();
    };

    const fileUploaded = (event) => {
        const fileUploaded = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = async function () {
            const url = await sendMessageToServer(reader.result);
            props.setImageUrl(url);
            props.setImageLoaded(true);
            alert("Изображение готово, отправьте сообщение для загрузки");
        };
        reader.readAsDataURL(fileUploaded);
    };

    const sendMessageToServer = async (base64) => {
        const res = await fetch("/api/chat/image", {
            method: "POST",
            body: JSON.stringify({
                base64: base64,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (res.status === 201) {
            const json = await res.json();
            return json.url;
        } else {
            const json = await res.json();
            alert(json.error);
        }
    };

    return (
        <>
        <AttachmentButton
            onClick={uploadFile}
            style={{
                fontSize: "1.2em",
                paddingLeft: "0.2em",
                paddingRight: "0.2em",
            }}
        />
            <input
                id="file-input"
                accept="image/*"
                type="file"
                ref={file}
                onChange={fileUploaded}
                style={{ display: "none" }}
            />
        </>
    )
}

export default FileUploader