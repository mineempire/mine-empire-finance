import {
  BodyContainer,
  Container,
  TitleContainer,
  Section,
  Line,
  Button,
  ButtonContainer,
} from "../../globalStyles";
import { useEffect, useState } from "react";
import {
  isConnected,
  getEnergyContract,
  getMineEmpireDrillContract,
} from "../../Web3Client";

import {
  NFTCard,
  NFTCardHeader,
  NFTCardStats,
  MarketContainer,
} from "./MarketStyles";
import { mineEmpireDrillAddress } from "../../contracts/Addresses";
import { ethers } from "ethers";
import { injected } from "../../connectors";
import { useWeb3React } from "@web3-react/core";

const MarketBody = () => {
  const [connected, setConnected] = useState(false);
  const [alt1MintedQuantity, setAlt1MintedQuantity] = useState(0);
  const [energyApproved, setEnergyApproved] = useState(false);
  let selectedAddress = "";

  const { activate } = useWeb3React();

  const energyContract = getEnergyContract();
  const mineEmpireDrillContract = getMineEmpireDrillContract();

  async function updateMintedQuantities() {
    if (selectedAddress === "") return;
    await mineEmpireDrillContract.methods
      .alternativeMints(1)
      .call()
      .then((alt1Details) => {
        setAlt1MintedQuantity(alt1Details.minted);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function checkEnergyApproved() {
    if (selectedAddress === "") return;
    await energyContract.methods
      .allowance(selectedAddress, mineEmpireDrillAddress)
      .call()
      .then((result) => {
        const amount = ethers.utils.formatEther(result).substring(0, 7);
        if (+amount < 1000) {
          setEnergyApproved(false);
        } else {
          setEnergyApproved(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function updateState() {
    if (await isConnected()) {
      selectedAddress = await injected.getAccount();
      setConnected(true);
      await checkEnergyApproved();
    }

    await updateMintedQuantities();
  }

  useEffect(() => {
    updateState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAltMint = async (id) => {
    if (selectedAddress === "") {
      selectedAddress = await injected.getAccount();
    }
    await mineEmpireDrillContract.methods
      .alternativeMintDrill(id)
      .send({ from: selectedAddress });
    await updateMintedQuantities();
  };

  const handleEnergyApprove = async () => {
    await energyContract.methods
      .approve(mineEmpireDrillAddress, "1000000000000000000000000")
      .send({ from: selectedAddress });
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
                  <h3 id="description">Minted / Max</h3>
                  <h3 id="stat">{alt1MintedQuantity}/100</h3>
                </NFTCardStats>
                <ButtonContainer>
                  {connected ? (
                    <>
                      {energyApproved ? (
                        <Button onClick={() => handleAltMint(1)}>
                          Mint Drill
                        </Button>
                      ) : (
                        <Button onClick={handleEnergyApprove}>Approve</Button>
                      )}
                    </>
                  ) : (
                    <Button onClick={() => activate(injected)}>Connect</Button>
                  )}
                </ButtonContainer>
              </NFTCard>
            </MarketContainer>
          </BodyContainer>
        </Container>
      </Section>
    </>
  );
};

export default MarketBody;
