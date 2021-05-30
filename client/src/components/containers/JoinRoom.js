import { JoinRoomContainer } from "../../styled-components";
import JoinRoomHeader from "../headers/JoinRoomHeader";
import ChooseRoom from "../interaction/ChooseRoom";

const JoinRoom = () => (
  <JoinRoomContainer>
    <JoinRoomHeader />
    <ChooseRoom />
  </JoinRoomContainer>
);

export default JoinRoom;
