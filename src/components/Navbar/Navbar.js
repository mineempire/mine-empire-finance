import React, { useEffect, useState } from "react";
import {
  connect,
  connectedAddress,
  getDailyEnergyContract,
  getEnergyContract,
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
import { useWeb3React } from "@web3-react/core";
import { injected } from "../../connectors";
import { ethers } from "ethers";

const Navbar = () => {
  // web3
  const [connected, setConnected] = useState(false);
  const [claimableEnergy, setClaimableEnergy] = useState(0);
  let selectedAddress = "";
  const dailyEnergyContract = getDailyEnergyContract();

  const { activate } = useWeb3React();

  async function updateClaimableEnergy() {
    const energy = await dailyEnergyContract.methods
      .getAccumulatedEnergy(selectedAddress)
      .call();
    setClaimableEnergy(ethers.utils.formatEther(energy).substring(0, 4));
  }

  async function updateState() {
    if (await isConnected()) {
      selectedAddress = await injected.getAccount();
      setConnected(true);
      updateClaimableEnergy();
    }
  }

  const handleClaimEnergy = async () => {
    await dailyEnergyContract.methods
      .claimEnergy()
      .send({ from: selectedAddress });
    await updateState();
  };

  useEffect(() => {
    updateState();
  });

  // website
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(!show);
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
                  <Button onClick={handleClaimEnergy}>Claim</Button>
                </Connected>
              </>
            ) : (
              <Button onClick={() => activate(injected)}>Connect</Button>
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
