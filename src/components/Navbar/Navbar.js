import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { CgMenuRight } from "react-icons/cg";
import { IconContext } from "react-icons";
import {
  Nav,
  NavbarContainer,
  NavLogo,
  NavIcon,
  MobileIcon,
  NavMenu,
  NavLinks,
  NavItem,
  ConnectWallet,
  Connected,
} from "./NavbarStyles.js";
import { Button } from "../../globalStyles.js";

const Navbar = () => {
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(!show);
  };

  let connected = false;

  return (
    <IconContext.Provider value={{ color: "#fff" }}>
      <Nav>
        <NavbarContainer>
          <NavLogo to="/">
            <NavIcon src="../../assets/logo.png" alt="logo" />
          </NavLogo>
          <NavMenu show={show}>
            <NavItem>
              <Link to="/">
                <NavLinks onClick={handleClick}>Dashboard</NavLinks>
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/cosmos">
                <NavLinks onClick={handleClick}>Cosmos</NavLinks>
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/market">
                <NavLinks onClick={handleClick}>Market</NavLinks>
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/refinery">
                <NavLinks onClick={handleClick}>Refinery</NavLinks>
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/converter">
                <NavLinks onClick={handleClick}>Converter</NavLinks>
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/inventory">
                <NavLinks onClick={handleClick}>Inventory</NavLinks>
              </Link>
            </NavItem>
          </NavMenu>
          <ConnectWallet>
            {connected ? (
              <Button>Connect</Button>
            ) : (
              <>
                <Connected>
                  <img src="../../assets/csc-icon.png" alt="" />
                  <p>30/30</p>
                  <Button>Claim</Button>
                </Connected>
              </>
            )}
          </ConnectWallet>

          <MobileIcon onClick={handleClick}>
            {show ? <FaTimes /> : <CgMenuRight />}
          </MobileIcon>
        </NavbarContainer>
      </Nav>
    </IconContext.Provider>
  );
};

export default Navbar;
