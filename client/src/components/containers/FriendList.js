import { FriendContainer } from "../../styled-components";
import AddedFriendList from "../interaction/AddedFriendList";
import FriendHeader from "../headers/FriendHeader";

const FriendList = () => {
  return (
    <FriendContainer>
      <FriendHeader />
      <AddedFriendList />
    </FriendContainer>
  );
};

export default FriendList;
