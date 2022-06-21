import {
  BodyContainer,
  Container,
  TitleContainer,
  Section,
  Line,
} from "../../globalStyles";

import { Button, CardButtonContainer } from "../../globalStyles";
import { useEffect, useState } from "react";
import { isConnected, connect, getEnergyContract } from "../../Web3Client";

import {
  NFTCard,
  NFTCardHeader,
  NFTCardStats,
  MintAmount,
  MarketContainer,
} from "./MarketStyles";
import { mineEmpireDrillAddress } from "../../contracts/Addresses";
import { ethers } from "ethers";

const MarketBody = () => {
  const [connected, setConnected] = useState(true);
  const [mintedQuantity, setMintedQuantity] = useState(0);
  const [energyApproved, setEnergyApproved] = useState(false);

  const energyContract = getEnergyContract();

  async function checkEnergyApproved() {
    const approved = await energyContract.methods
      .allowance(window.ethereum.selectedAddress, mineEmpireDrillAddress)
      .call();
    const amount = ethers.utils.formatEther(approved).substring(0, 7);
    if (+amount < 1000) {
      setEnergyApproved(false);
    } else {
      setEnergyApproved(true);
    }
    console.log("checked");
  }

  async function checkConnection() {
    const connected = await isConnected();
    setConnected(connected);
  }

  useEffect(() => {
    checkConnection();
    checkEnergyApproved();

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

  const handleMint = async (id) => {
    // await mine
  };

  const handleEnergyApprove = async () => {
    await energyContract.methods
      .approve(mineEmpireDrillAddress, "1000000000000000000000000")
      .send({ from: window.ethereum.selectedAddress });
    await checkEnergyApproved();
  };

  return (
    <>
      <Section>
        <Container>
          <TitleContainer>
            <h1>Mint Items to Power your Mines</h1>
            <h3>
              Mint drills and stake them in planets in the Cosmos to start
              collecting resources!
            </h3>
            <h3>
              Upgrade your drills to to increase your mining power. Mining Power
              multiplies the base production of any asteroid or planet.
            </h3>
          </TitleContainer>
        </Container>
        <Container>
          <BodyContainer>
            <MarketContainer>
              <NFTCard>
                <NFTCardHeader>
                  <img src="../../assets/level-1-icon.png" alt="" />
                  <h1>Asteroid Drill</h1>
                  <img src="../../assets/power-1.00-icon.png" alt="" />
                </NFTCardHeader>
                <img
                  id="drill-image"
                  src="../../assets/asteroid-drill.png"
                  alt=""
                />
                <Line width="320px" />
                <NFTCardStats>
                  <h3 id="description">Price</h3>
                  <h3 id="stat">30 ENERGY</h3>
                  <h3 id="description">Speciality</h3>
                  <h3 id="stat">Asteroid</h3>
                  <h3 id="description">Level / Max</h3>
                  <h3 id="stat">1 / 20</h3>
                  <h3 id="description">Power / Max</h3>
                  <h3 id="stat">1.00 / 48.63</h3>
                  <h3 id="description">Available / Max</h3>
                  <h3 id="stat">{mintedQuantity}/100</h3>
                </NFTCardStats>
                <MintAmount>
                  <CardButtonContainer>
                    {connected ? (
                      <>
                        {energyApproved ? (
                          <Button onClick={() => handleMint(1)}>
                            Mint Drill
                          </Button>
                        ) : (
                          <Button onClick={handleEnergyApprove}>Approve</Button>
                        )}
                      </>
                    ) : (
                      <Button onClick={handleConnect}>Connect</Button>
                    )}
                  </CardButtonContainer>
                </MintAmount>
              </NFTCard>
            </MarketContainer>
          </BodyContainer>
        </Container>
      </Section>
    </>
  );
};

export default MarketBody;
