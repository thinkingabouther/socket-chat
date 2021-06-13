import React from "react";
import { AuthConsumer } from "../auth/AuthProvider";
import FriendListWrapper from "../friendList/FriendListWrapper";
import Header from "../headers/Header";
import { HomeContainer } from "../../styled-components";

const Home = () => (
  <AuthConsumer>
    {(context) => (
      <>
        <Header user={context.user} />
        <HomeContainer>
          <FriendListWrapper user={context.user} />
        </HomeContainer>
      </>
    )}
  </AuthConsumer>
);

export default Home;
