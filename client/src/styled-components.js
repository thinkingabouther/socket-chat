import styled from "styled-components";

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

export const HomeContainer = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export const FriendContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  font-size: 2em;
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

export const ChatParentContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`;
