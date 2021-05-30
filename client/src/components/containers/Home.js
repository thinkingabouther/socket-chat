import React from "react";
import { AuthConsumer } from "../auth/AuthProvider";
import FriendList from "./FriendList";
import Header from "../headers/Header";
import {HomeContainer} from "../../styled-components";

const Home = (props) => (
  <AuthConsumer>
    {(context) => (
      <>
        <Header user={context.user} />
        <HomeContainer>
          <FriendList />
        </HomeContainer>
      </>
    )}
  </AuthConsumer>
);

export default Home;
