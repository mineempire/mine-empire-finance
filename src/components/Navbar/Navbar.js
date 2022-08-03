import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { CgMenuRight } from "react-icons/cg";
import { IconContext } from "react-icons";
import {
  Nav,
  NavbarContainer,
  NavIcon,
  MobileIcon,
  NavMenu,
  NavLinks,
  NavItem,
  ConnectWallet,
  LogoContainer,
} from "./NavbarStyles.js";

const Navbar = () => {
  // website
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(!show);
  };

  return (
    <IconContext.Provider value={{ color: "#fff" }}>
      <Nav>
        <NavbarContainer>
          <LogoContainer>
            <Link to="/">
              <NavIcon src="../../assets/logo.png" alt="logo" />
            </Link>
          </LogoContainer>
          <NavMenu show={show}>
            <NavItem>
              <Link to="/">
                <NavLinks>Dashboard</NavLinks>
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/farms">
                <NavLinks>Farms</NavLinks>
              </Link>
            </NavItem>
            <NavItem>
              <a href="https://app.mineempire.io/">
                <NavLinks>Game</NavLinks>
              </a>
            </NavItem>
          </NavMenu>
          <ConnectWallet></ConnectWallet>

          <MobileIcon onClick={handleClick}>
            {show ? <FaTimes /> : <CgMenuRight />}
          </MobileIcon>
        </NavbarContainer>
      </Nav>
    </IconContext.Provider>
  );
};

export default Navbar;
