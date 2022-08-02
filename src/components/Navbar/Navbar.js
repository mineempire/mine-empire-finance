import React, { useEffect, useState } from "react";
import { isConnected } from "../../Web3Client.js";
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
  Connected,
  SingleButtonContainer,
  LogoContainer,
} from "./NavbarStyles.js";
import { Button } from "../../globalStyles.js";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../../connectors";

const Navbar = () => {
  // web3
  const [connected, setConnected] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");

  const { activate } = useWeb3React();

  async function checkConnected() {
    if (await isConnected()) {
      setConnected(true);
      setSelectedAddress(await injected.getAccount());
    }
  }

  async function updateState() {
    await checkConnected();
  }

  useEffect(() => {
    updateState();

    const intervalId = setInterval(() => {
      updateState();
    }, 5000);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line
  }, []);

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
          <ConnectWallet>
            <>
              {connected ? (
                <>
                  <Connected>
                    <p>{selectedAddress.substring(0, 6)}</p>
                  </Connected>
                </>
              ) : (
                <SingleButtonContainer>
                  <Button onClick={() => activate(injected)}>Connect</Button>
                </SingleButtonContainer>
              )}
            </>
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
