import React, { useState } from "react";
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
import { useLocation } from "react-router-dom";
import { Button } from "../../globalStyles.js";

const Navbar = () => {
  const [show, setShow] = useState(false);

  let location = useLocation();

  const handleClick = () => {
    setShow(!show);
  };

  const scrollTo = (id) => {
    const element = document.getElementById(id);

    element.scrollIntoView({
      behavior: "smooth",
    });
  };

  const closeMobileMenu = (to, id) => {
    if (id && location.pathname === "/") {
      scrollTo(id);
    }

    setShow(false);
  };

  let connected = false;

  return (
    <IconContext.Provider value={{ color: "#fff" }}>
      <Nav>
        <NavbarContainer>
          <NavLogo to="/">
            <NavIcon src="./assets/logo.png" alt="logo" />
          </NavLogo>
          <MobileIcon onClick={handleClick}>
            {show ? <FaTimes /> : <CgMenuRight />}
          </MobileIcon>
          <NavMenu show={show}>
            <NavItem>
              <NavLinks onclick={() => closeMobileMenu("", "")}>
                Dashboard
              </NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks onclick={() => closeMobileMenu("", "")}>
                Cosmos
              </NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks onclick={() => closeMobileMenu("", "")}>
                Market
              </NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks onclick={() => closeMobileMenu("", "")}>
                Refinery
              </NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks onclick={() => closeMobileMenu("", "")}>
                Converter
              </NavLinks>
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
        </NavbarContainer>
      </Nav>
    </IconContext.Provider>
  );
};

export default Navbar;
