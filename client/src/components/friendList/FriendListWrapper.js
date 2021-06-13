import { FriendContainer } from "../../styled-components";
import FriendList from "./FriendList";
import FriendHeader from "../headers/FriendHeader";

const FriendListWrapper = (props) => {
  return (
    <FriendContainer>
      <FriendHeader />
      <FriendList user={props.user} />
    </FriendContainer>
  );
};

export default FriendListWrapper;
