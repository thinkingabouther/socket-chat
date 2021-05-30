import {
  Button,
  FormInput,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "shards-react";
import { v1 as uuid } from "uuid";
import { useHistory } from "react-router-dom";
import { useState } from "react";

const ChooseRoom = () => {
  const history = useHistory();
  const [roomId, setRoomId] = useState("");
  const [error, setError] = useState(false);

  function create() {
    const id = uuid();
    history.push(`/room/${id}`);
  }

  function url() {
    const urlParts = window.location.href.split("/");
    return urlParts[2];
  }

  function connect() {
    if (roomId === "") {
      setError(true);
      return;
    }
    history.push(`/room/${roomId}`);
  }

  function handleInputChange(e) {
    setRoomId(e.target.value);
  }

  return (
    <>
      <label htmlFor="connect-to-room">Connect to an existing room:</label>
      <InputGroup id="connect-to-room">
        <InputGroupAddon type="prepend">
          <InputGroupText>{url()}</InputGroupText>
        </InputGroupAddon>
        <FormInput
          placeholder="123-456-789"
          value={roomId}
          invalid={error}
          onChange={handleInputChange}
        />
        <InputGroupAddon type="append">
          <Button theme="secondary" onClick={connect}>
            Connect!
          </Button>
        </InputGroupAddon>
      </InputGroup>
      <br />
      <label htmlFor="create-room">
        Otherwise, you can create your own room:
      </label>
      <Button id="create-room" onClick={create}>
        Create room!
      </Button>
    </>
  );
};

export default ChooseRoom;
