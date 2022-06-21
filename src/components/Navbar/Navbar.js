import React, { useEffect, useState } from "react";
import {
  connect,
  getDailyEnergyContract,
  isConnected,
} from "../../Web3Client.js";
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
import { ethers } from "ethers";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [connected, setConnected] = useState(false);
  const [claimableEnergy, setClaimableEnergy] = useState(0);

  const dailyEnergy = getDailyEnergyContract();

  const handleClick = () => {
    setShow(!show);
  };

  useEffect(() => {
    async function getDailyEnergy() {
      const energyAvailable = await dailyEnergy.methods
        .getAccumulatedEnergy(window.ethereum.selectedAddress)
        .call();

      setClaimableEnergy(
        ethers.utils.formatEther(energyAvailable).substring(0, 4)
      );
    }

    async function checkConnection() {
      const connected = await isConnected();
      setConnected(connected);
    }

    checkConnection();
    getDailyEnergy();

    window.ethereum.on("accountsChanged", function (accounts) {
      if (accounts && accounts.length > 0) {
        setConnected(true);
      } else {
        setConnected(false);
      }
    });
  }, []);

  const handleConnect = async () => {
    await connect();
  };

  const claimEnergy = async () => {
    await dailyEnergy.methods
      .claimEnergy()
      .send({ from: window.ethereum.selectedAddress });
  };

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
              <>
                <Connected>
                  <img src="../../assets/energy.png" alt="" />
                  <p>{claimableEnergy}/30</p>
                  <Button onClick={claimEnergy}>Claim</Button>
                </Connected>
              </>
            ) : (
              <Button onClick={handleConnect}>Connect</Button>
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
