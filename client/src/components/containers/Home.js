import React from "react";
import { AuthConsumer } from "../auth/AuthProvider";
import { HomeContainer } from "../../styled-components";
import JoinRoom from "./JoinRoom";
import FriendList from "./FriendList";
import Header from "../headers/Header";

const Home = (props) => (
  <AuthConsumer>
    {(context) => (
      <div>
        <Header user={context.user} />
        <HomeContainer>
          <JoinRoom history={props.history} />
          <FriendList />
        </HomeContainer>
      </div>
    )}
  </AuthConsumer>
);

export default Home;
