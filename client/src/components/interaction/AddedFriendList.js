import useSWR from "swr";
import { useState } from "react";
import {
  Button,
  Fade,
  FormGroup,
  FormInput,
  InputGroup,
  InputGroupAddon,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
} from "shards-react";
import {
  AddFriendErrorText,
  FriendLink,
  FriendListContainer,
  FriendPicture,
} from "../../styled-components";
import { useHistory } from "react-router-dom";

const friendsEndpoint = "api/user/friends";

const AddedFriendList = () => {
  const history = useHistory();
  const [userEmail, setUserEmail] = useState();
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);
  const { data, mutate } = useSWR(friendsEndpoint, { refreshInterval: 100 });

  const handleInputChange = (e) => {
    setUserEmail(e.target.value);
  };

  const goToRoom = (roomID) => {
    history.push("room/" + roomID);
  };

  const addFriend = async () => {
    const res = await fetch("/api/user/add-friend", {
      method: "POST",
      body: JSON.stringify({
        email: userEmail,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res);
    if (res.status !== 201) {
      const json = await res.json();
      setError(json.message);
      setIsError(true);
    } else {
      setIsError(false);
    }
    mutate();
  };

  return (
    <>
      <FormGroup>
        <label htmlFor="email">Add your new friend</label>
        <InputGroup>
          <FormInput
            id="email"
            invalid={isError}
            placeholder={"example@inbox.com"}
            value={userEmail}
            onChange={handleInputChange}
          />
          <InputGroupAddon type="append">
            <Button onClick={addFriend}>Add!</Button>
          </InputGroupAddon>
        </InputGroup>
        <Fade in={isError}>
          <AddFriendErrorText>{error}</AddFriendErrorText>
        </Fade>
      </FormGroup>
      <FriendListContainer>
        <ListGroup>
          <ListGroupItemHeading>Added friends:</ListGroupItemHeading>
          {(!data || data.message) && (
            <ListGroupItem>Your friends will appear here</ListGroupItem>
          )}
          {data &&
            data.length > 0 &&
            data.map((friend) => (
              <FriendLink onClick={() => goToRoom(friend.roomID)}>
                <ListGroupItem key={friend.roomID}>
                  <FriendPicture src={friend.picture} />
                  {friend.name}
                </ListGroupItem>
              </FriendLink>
            ))}
        </ListGroup>
      </FriendListContainer>
    </>
  );
};

export default AddedFriendList;
