import { FriendContainer } from "../../styled-components";
import AddedFriendList from "./AddedFriendList";
import FriendHeader from "../headers/FriendHeader";

const FriendList = (props) => {
  return (
    <FriendContainer>
      <FriendHeader />
      <AddedFriendList user={props.user} />
    </FriendContainer>
  );
};

export default FriendList;
