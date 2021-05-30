import styled from "styled-components";

export const PeersVideoContainer = styled.div`
  padding: 1rem;
  display: flex;
  height: 90vh;
  width: 90vw;
  margin: auto;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
`;

export const SinglePeerVideoContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
`;

export const VideoDescriptionContainer = styled.div`
  background: white;
  width: 100%;
  text-align: center;
`;

export const VideoDescription = styled.span`
  color: black;
  text-align: center;
  font-size: large;
`;

export const PeerVideoPlayer = styled.video`
  height: 360px;
  width: 640px;
  object-fit: cover;
`;

export const UserVideo = styled.video`
  height: 180px;
  width: 320px;
  object-fit: cover;
`;

export const UserVideoContainer = styled.div`
  max-width: 30rem;
  max-height: 30rem;
  height: auto;
  width: auto;
  position: absolute;
  top: 1rem;
  left: 1rem;
  z-index: 1;
  display: flex;
  flex-direction: column;
`;

export const ControlsContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100vw;
  height: 5rem;
  z-index: 1;
  align-items: center;
  justify-content: space-around;
  display: flex;
  background: white;
`;

export const RoomContainer = styled.div`
  background: black;
`;

export const ControlsIconContainer = styled.span`
  padding: 10px;
  border-radius: 50%;
  border: 2px solid black;
  width: 4rem;
  height: 4rem;
  cursor: pointer;
  display: flex;
  background: lightgrey;
`;

export const ControlIcon = styled.img`
  object-fit: cover;
`;

export const AuthComponentContainer = styled.div`
  position: absolute;
  right: 1rem;
`;

export const LogoutIconContainer = styled.span`
  padding: 10px;
  border-radius: 50%;
  border: 1px solid black;
  width: 3rem;
  height: 3rem;
  cursor: pointer;
  display: flex;
  background: grey;
  margin: 3px;
`;

export const LogoutContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const JoinRoomContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const HomeContainer = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export const FriendContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FriendListContainer = styled.div`
  margin-top: 3rem;
`;

export const LogoImage = styled.img`
  width: 60px;
  height: 60px;
`;

export const AddFriendErrorText = styled.span`
  display: inline-block;
  text-align: center;
  width: 20rem;
`;

export const HeaderAppName = styled.span`
  font-size: large;
`;

export const UserDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
`;

export const UserPicture = styled.img`
  border-radius: 50%;
  object-fit: cover;
  width: 50px;
  height: 50px;
`;

export const FriendPicture = styled.img`
  border-radius: 50%;
  object-fit: cover;
  width: 40px;
  height: 40px;
  margin-right: 1rem;
`;

export const UsernameSpan = styled.span`
  font-size: large;
  color: white;
`;

export const HeaderContainer = styled.div`
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 3rem;
`;

export const FriendLink = styled.span`
  cursor: pointer;
  text-decoration: underline;
`;
