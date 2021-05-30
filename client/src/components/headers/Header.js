import logoIcon from "../../icons/logoIcon.png";
import { HeaderAppName, LogoImage } from "../../styled-components";
import { Navbar, NavbarBrand } from "shards-react";
import AuthComponent from "../auth/AuthComponent";
import React from "react";

const Header = (props) => (
  <Navbar type="dark" theme="secondary" expand="md">
    <NavbarBrand href="#">
      <LogoImage src={logoIcon} alt="logo icon" />
      <HeaderAppName>Socket chat</HeaderAppName>
    </NavbarBrand>
    <AuthComponent user={props.user} />
  </Navbar>
);

export default Header;
