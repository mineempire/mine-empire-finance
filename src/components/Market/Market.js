import {
  BodyContainer,
  Container,
  TitleContainer,
  Section,
  Line,
  Button,
  ButtonContainer,
  ButtonGray,
  BasicButton,
} from "../../globalStyles";
import { useEffect, useState } from "react";
import {
  isConnected,
  getEnergyContract,
  getMineEmpireDrillContract,
  getCosmicCashContract,
} from "../../Web3Client";

import {
  NFTCard,
  NFTCardHeader,
  NFTCardStats,
  MarketContainer,
  NFTCardStatsRow,
  NFTCardStatsRowWithImg,
  RightFlexDiv,
} from "./MarketStyles";
import { mineEmpireDrillAddress } from "../../contracts/Addresses";
import { ethers } from "ethers";
import { injected } from "../../connectors";
import { useWeb3React } from "@web3-react/core";

const MarketBody = () => {
  const [connected, setConnected] = useState(false);
  const [alt1MintedQuantity, setAlt1MintedQuantity] = useState(0);
  const [alt2MintedQuantity, setAlt2MintedQuantity] = useState(0);
  const [alt3MintedQuantity, setAlt3MintedQuantity] = useState(0);
  const [alt4MintedQuantity, setAlt4MintedQuantity] = useState(0);
  const [alt5MintedQuantity, setAlt5MintedQuantity] = useState(0);
  const [alt6MintedQuantity, setAlt6MintedQuantity] = useState(0);
  const [launchTime, setLaunchTime] = useState(0);
  const [energyApproved, setEnergyApproved] = useState(false);
  const [cosmicCashApproved, setCosmicCashApproved] = useState(false);
  const [energyBalance, setEnergyBalance] = useState(0);
  const [cosmicCashBalance, setcosmicCashBalance] = useState(0);
  const [disableButtons, setDisableButtons] = useState(false);
  let selectedAddress = "";

  const { activate } = useWeb3React();

  const energyContract = getEnergyContract();
  const cosmicCashContract = getCosmicCashContract();
  const mineEmpireDrillContract = getMineEmpireDrillContract();

  async function updateMintedQuantities() {
    selectedAddress = await injected.getAccount();
    for (let i = 1; i <= 6; i++) {
      await mineEmpireDrillContract.methods
        .alternativeMints(i)
        .call()
        .then((altMintDetails) => {
          if (i === 1) setAlt1MintedQuantity(altMintDetails.minted);
          if (i === 2) setAlt2MintedQuantity(altMintDetails.minted);
          if (i === 3) setAlt3MintedQuantity(altMintDetails.minted);
          if (i === 4) setAlt4MintedQuantity(altMintDetails.minted);
          if (i === 5) setAlt5MintedQuantity(altMintDetails.minted);
          if (i === 6) setAlt6MintedQuantity(altMintDetails.minted);
        })
        .catch((err) => console.log(err));
    }
  }

  async function checkEnergyApproved() {
    if (selectedAddress === "") return;
    await energyContract.methods
      .allowance(selectedAddress, mineEmpireDrillAddress)
      .call()
      .then((result) => {
        const amount = ethers.utils.formatEther(result).substring(0, 7);
        if (+amount < 10000) {
          setEnergyApproved(false);
        } else {
          setEnergyApproved(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function checkCosmicCashApproved() {
    const addr = await injected.getAccount();
    await cosmicCashContract.methods
      .allowance(addr, mineEmpireDrillAddress)
      .call()
      .then((result) => {
        const amount = ethers.utils.formatEther(result);
        if (+amount < 10000) {
          setCosmicCashApproved(false);
        } else {
          setCosmicCashApproved(true);
        }
      });
  }

  async function checkEnergyBalance() {
    const addr = await injected.getAccount();
    await energyContract.methods
      .balanceOf(addr)
      .call()
      .then((result) => {
        const amount = ethers.utils.formatEther(result);
        setEnergyBalance(+amount);
      });
  }

  async function checkCosmicCashBalance() {
    const addr = await injected.getAccount();
    await cosmicCashContract.methods
      .balanceOf(addr)
      .call()
      .then((result) => {
        const amount = ethers.utils.formatEther(result);
        setcosmicCashBalance(+amount);
      });
  }

  async function updateState() {
    if (await isConnected()) {
      selectedAddress = await injected.getAccount();
      setConnected(true);
      await checkEnergyApproved();
    }
    checkCosmicCashApproved();
    updateMintedQuantities();
    checkEnergyBalance();
    checkCosmicCashBalance();
  }

  useEffect(() => {
    const timeDiff = 1657382400 - Math.floor(Date.now() / 1000);
    setLaunchTime(timeDiff);
    const intervalId = setInterval(() => {
      if (launchTime >= 0) {
        const timeDiff = 1657382400 - Math.floor(Date.now() / 1000);
        setLaunchTime(timeDiff);
      }
    }, 1000);
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    updateState();
    const intervalId = setInterval(() => {
      updateState();
    }, 5000);
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAltMint = async (id) => {
    if (disableButtons) return;
    setDisableButtons(true);
    if (selectedAddress === "") {
      selectedAddress = await injected.getAccount();
    }
    await mineEmpireDrillContract.methods
      .alternativeMintDrill(id)
      .send({ from: selectedAddress })
      .catch((err) => console.log(err));
    await updateMintedQuantities();
    await checkEnergyBalance();
    await checkCosmicCashBalance();
    setDisableButtons(false);
  };

  const handleEnergyApprove = async () => {
    if (disableButtons) return;
    setDisableButtons(true);
    selectedAddress = await injected.getAccount();
    await energyContract.methods
      .approve(mineEmpireDrillAddress, "1000000000000000000000000")
      .send({ from: selectedAddress });
    await checkEnergyApproved();
    setDisableButtons(false);
  };

  const handleCosmicCashApprove = async () => {
    if (disableButtons) return;
    setDisableButtons(true);
    const addr = await injected.getAccount();
    await cosmicCashContract.methods
      .approve(mineEmpireDrillAddress, "1000000000000000000000000")
      .send({ from: addr })
      .catch((err) => console.log(err));
    await checkCosmicCashApproved();
    setDisableButtons(false);
  };

  function secondsToHms(d) {
    d = Number(d);
    const h = Math.floor(d / 3600);
    const m = Math.floor((d % 3600) / 60);
    const s = Math.floor((d % 3600) % 60);
    const hDisplay = h > 0 ? h + "h " : "";
    const mDisplay = m > 0 ? m + "m " : "";
    const sDisplay = s > 0 ? s + "s " : "";
    return hDisplay + mDisplay + sDisplay;
  }

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
            <RightFlexDiv>
              <a
                href="https://paintswap.finance/marketplace/collections/0x51bc1283a760ef2528b57210af73330af71f052b"
                rel="noreferrer"
                target="_blank"
              >
                <BasicButton>PaintSwap Collection</BasicButton>
              </a>
            </RightFlexDiv>
          </TitleContainer>
        </Container>
        <Container>
          <BodyContainer>
            <MarketContainer>
              <NFTCard>
                <NFTCardHeader>
                  <img
                    src="../../assets/asteroid-drill-levels/level-5-level.png"
                    alt=""
                  />
                  <h1>Asteroid Drill</h1>
                  <img
                    src="../../assets/asteroid-drill-levels/level-5-power.png"
                    alt=""
                  />
                </NFTCardHeader>
                <img
                  id="drill-image"
                  src="../../assets/asteroid-drill-v2.png"
                  alt=""
                />
                <Line width="320px" />
                <NFTCardStats>
                  <NFTCardStatsRow>
                    <h3 id="description">Price</h3>
                    <NFTCardStatsRowWithImg>
                      <h3 id="stat">116 CSC</h3>
                      <img src="../../assets/csc-icon.png" alt="" />
                    </NFTCardStatsRowWithImg>
                  </NFTCardStatsRow>
                  <NFTCardStatsRow>
                    <h3 id="description">Speciality</h3>
                    <h3 id="stat">Asteroid</h3>
                  </NFTCardStatsRow>
                  <NFTCardStatsRow>
                    <h3 id="description">APR / Max</h3>
                    <h3 id="stat">218% / 263%</h3>
                  </NFTCardStatsRow>
                  <NFTCardStatsRow>
                    <h3 id="description">Level / Max</h3>
                    <h3 id="stat">6 / 20</h3>
                  </NFTCardStatsRow>
                  <NFTCardStatsRow>
                    <h3 id="description">Power / Max</h3>
                    <h3 id="stat">x2.85 / 35.70</h3>
                  </NFTCardStatsRow>
                  <NFTCardStatsRow>
                    <h3 id="description">Minted / Max</h3>
                    <h3 id="stat">{alt4MintedQuantity}/200</h3>
                  </NFTCardStatsRow>
                </NFTCardStats>
                <ButtonContainer>
                  {connected ? (
                    <>
                      {launchTime > 0 ? (
                        <>
                          <Button disable={true}>
                            {secondsToHms(launchTime)}
                          </Button>
                        </>
                      ) : (
                        <>
                          {cosmicCashApproved ? (
                            <>
                              {alt4MintedQuantity === "200" ? (
                                <ButtonGray>Minted Out</ButtonGray>
                              ) : (
                                <>
                                  {cosmicCashBalance >= 116 ? (
                                    <Button
                                      onClick={() => handleAltMint(4)}
                                      disable={disableButtons}
                                    >
                                      Mint Drill
                                    </Button>
                                  ) : (
                                    <Button>Get Cosmic Cash</Button>
                                  )}
                                </>
                              )}
                            </>
                          ) : (
                            <Button
                              onClick={handleCosmicCashApprove}
                              disable={disableButtons}
                            >
                              Approve CSC
                            </Button>
                          )}
                        </>
                      )}
                    </>
                  ) : (
                    <Button
                      onClick={() => activate(injected)}
                      disable={disableButtons}
                    >
                      Connect
                    </Button>
                  )}
                </ButtonContainer>
              </NFTCard>
              <NFTCard>
                <NFTCardHeader>
                  <img
                    src="../../assets/asteroid-drill-levels/level-10-level.png"
                    alt=""
                  />
                  <h1>Asteroid Drill</h1>
                  <img
                    src="../../assets/asteroid-drill-levels/level-10-power.png"
                    alt=""
                  />
                </NFTCardHeader>
                <img
                  id="drill-image"
                  src="../../assets/asteroid-drill-v3.png"
                  alt=""
                />
                <Line width="320px" />
                <NFTCardStats>
                  <NFTCardStatsRow>
                    <h3 id="description">Price</h3>
                    <NFTCardStatsRowWithImg>
                      <h3 id="stat">434 CSC</h3>
                      <img src="../../assets/csc-icon.png" alt="" />
                    </NFTCardStatsRowWithImg>
                  </NFTCardStatsRow>
                  <NFTCardStatsRow>
                    <h3 id="description">Speciality</h3>
                    <h3 id="stat">Asteroid</h3>
                  </NFTCardStatsRow>
                  <NFTCardStatsRow>
                    <h3 id="description">APR / Max</h3>
                    <h3 id="stat">184% / 223%</h3>
                  </NFTCardStatsRow>
                  <NFTCardStatsRow>
                    <h3 id="description">Level / Max</h3>
                    <h3 id="stat">11 / 20</h3>
                  </NFTCardStatsRow>
                  <NFTCardStatsRow>
                    <h3 id="description">Power / Max</h3>
                    <h3 id="stat">x9.00 / 35.70</h3>
                  </NFTCardStatsRow>
                  <NFTCardStatsRow>
                    <h3 id="description">Minted / Max</h3>
                    <h3 id="stat">{alt5MintedQuantity}/50</h3>
                  </NFTCardStatsRow>
                </NFTCardStats>
                <ButtonContainer>
                  {connected ? (
                    <>
                      {launchTime > 0 ? (
                        <>
                          <Button disable={true}>
                            {secondsToHms(launchTime)}
                          </Button>
                        </>
                      ) : (
                        <>
                          {cosmicCashApproved ? (
                            <>
                              {alt5MintedQuantity === "50" ? (
                                <ButtonGray>Minted Out</ButtonGray>
                              ) : (
                                <>
                                  {cosmicCashBalance >= 434 ? (
                                    <Button
                                      onClick={() => handleAltMint(5)}
                                      disable={disableButtons}
                                    >
                                      Mint Drill
                                    </Button>
                                  ) : (
                                    <Button>Get Cosmic Cash</Button>
                                  )}
                                </>
                              )}
                            </>
                          ) : (
                            <Button
                              onClick={handleCosmicCashApprove}
                              disable={disableButtons}
                            >
                              Approve CSC
                            </Button>
                          )}
                        </>
                      )}
                    </>
                  ) : (
                    <Button
                      onClick={() => activate(injected)}
                      disable={disableButtons}
                    >
                      Connect
                    </Button>
                  )}
                </ButtonContainer>
              </NFTCard>
              <NFTCard>
                <NFTCardHeader>
                  <img
                    src="../../assets/asteroid-drill-levels/level-15-level.png"
                    alt=""
                  />
                  <h1>Asteroid Drill</h1>
                  <img
                    src="../../assets/asteroid-drill-levels/level-15-power.png"
                    alt=""
                  />
                </NFTCardHeader>
                <img
                  id="drill-image"
                  src="../../assets/asteroid-drill-v4.png"
                  alt=""
                />
                <Line width="320px" />
                <NFTCardStats>
                  <NFTCardStatsRow>
                    <h3 id="description">Price</h3>
                    <NFTCardStatsRowWithImg>
                      <h3 id="stat">1094 CSC</h3>
                      <img src="../../assets/csc-icon.png" alt="" />
                    </NFTCardStatsRowWithImg>
                  </NFTCardStatsRow>
                  <NFTCardStatsRow>
                    <h3 id="description">Speciality</h3>
                    <h3 id="stat">Asteroid</h3>
                  </NFTCardStatsRow>
                  <NFTCardStatsRow>
                    <h3 id="description">APR / Max</h3>
                    <h3 id="stat">164% / 199%</h3>
                  </NFTCardStatsRow>
                  <NFTCardStatsRow>
                    <h3 id="description">Level / Max</h3>
                    <h3 id="stat">16 / 20</h3>
                  </NFTCardStatsRow>
                  <NFTCardStatsRow>
                    <h3 id="description">Power / Max</h3>
                    <h3 id="stat">x20.30 / 35.70</h3>
                  </NFTCardStatsRow>
                  <NFTCardStatsRow>
                    <h3 id="description">Minted / Max</h3>
                    <h3 id="stat">{alt6MintedQuantity}/20</h3>
                  </NFTCardStatsRow>
                </NFTCardStats>
                <ButtonContainer>
                  {connected ? (
                    <>
                      {launchTime > 0 ? (
                        <>
                          <Button disable={true}>
                            {secondsToHms(launchTime)}
                          </Button>
                        </>
                      ) : (
                        <>
                          {cosmicCashApproved ? (
                            <>
                              {alt6MintedQuantity === "20" ? (
                                <ButtonGray>Minted Out</ButtonGray>
                              ) : (
                                <>
                                  {cosmicCashBalance >= 1094 ? (
                                    <Button
                                      onClick={() => handleAltMint(6)}
                                      disable={disableButtons}
                                    >
                                      Mint Drill
                                    </Button>
                                  ) : (
                                    <Button>Get Cosmic Cash</Button>
                                  )}
                                </>
                              )}
                            </>
                          ) : (
                            <Button
                              onClick={handleCosmicCashApprove}
                              disable={disableButtons}
                            >
                              Approve CSC
                            </Button>
                          )}
                        </>
                      )}
                    </>
                  ) : (
                    <Button
                      onClick={() => activate(injected)}
                      disable={disableButtons}
                    >
                      Connect
                    </Button>
                  )}
                </ButtonContainer>
              </NFTCard>
              <NFTCard>
                <NFTCardHeader>
                  <img
                    src="../../assets/asteroid-drill-levels/level-0-level.png"
                    alt=""
                  />
                  <h1>Asteroid Drill</h1>
                  <img
                    src="../../assets/asteroid-drill-levels/level-0-power.png"
                    alt=""
                  />
                </NFTCardHeader>
                <img
                  id="drill-image"
                  src="../../assets/asteroid-drill-v1.png"
                  alt=""
                />
                <Line width="320px" />
                <NFTCardStats>
                  <NFTCardStatsRow>
                    <h3 id="description">Price</h3>
                    <NFTCardStatsRowWithImg>
                      <h3 id="stat">30 ENERGY</h3>
                      <img src="../../assets/energy.png" alt="" />
                    </NFTCardStatsRowWithImg>
                  </NFTCardStatsRow>
                  <NFTCardStatsRow>
                    <h3 id="description">Speciality</h3>
                    <h3 id="stat">Asteroid</h3>
                  </NFTCardStatsRow>
                  <NFTCardStatsRow>
                    <h3 id="description">APR / Max</h3>
                    <h3 id="stat">INF% / INF%</h3>
                  </NFTCardStatsRow>
                  <NFTCardStatsRow>
                    <h3 id="description">Level / Max</h3>
                    <h3 id="stat">1 / 20</h3>
                  </NFTCardStatsRow>
                  <NFTCardStatsRow>
                    <h3 id="description">Power / Max</h3>
                    <h3 id="stat">x0.30 / 35.70</h3>
                  </NFTCardStatsRow>
                  <NFTCardStatsRow>
                    <h3 id="description">Minted / Max</h3>
                    <h3 id="stat">{alt1MintedQuantity}/250</h3>
                  </NFTCardStatsRow>
                </NFTCardStats>
                <ButtonContainer>
                  {connected ? (
                    <>
                      {launchTime > 0 ? (
                        <>
                          <Button disable={true}>
                            {secondsToHms(launchTime)}
                          </Button>
                        </>
                      ) : (
                        <>
                          {energyApproved ? (
                            <>
                              {alt1MintedQuantity === "250" ? (
                                <ButtonGray>Minted Out</ButtonGray>
                              ) : (
                                <>
                                  {energyBalance >= 30 ? (
                                    <Button
                                      onClick={() => handleAltMint(1)}
                                      disable={disableButtons}
                                    >
                                      Mint Drill
                                    </Button>
                                  ) : (
                                    <Button disable={true}>
                                      Not Enough Energy
                                    </Button>
                                  )}
                                </>
                              )}
                            </>
                          ) : (
                            <Button
                              onClick={handleEnergyApprove}
                              disable={disableButtons}
                            >
                              Approve ENERGY
                            </Button>
                          )}
                        </>
                      )}
                    </>
                  ) : (
                    <Button
                      onClick={() => activate(injected)}
                      disable={disableButtons}
                    >
                      Connect
                    </Button>
                  )}
                </ButtonContainer>
              </NFTCard>
              <NFTCard>
                <NFTCardHeader>
                  <img
                    src="../../assets/asteroid-drill-levels/level-0-level.png"
                    alt=""
                  />
                  <h1>Asteroid Drill</h1>
                  <img
                    src="../../assets/asteroid-drill-levels/level-0-power.png"
                    alt=""
                  />
                </NFTCardHeader>
                <img
                  id="drill-image"
                  src="../../assets/asteroid-drill-v1.png"
                  alt=""
                />
                <Line width="320px" />
                <NFTCardStats>
                  <NFTCardStatsRow>
                    <h3 id="description">Price</h3>
                    <NFTCardStatsRowWithImg>
                      <h3 id="stat">90 ENERGY</h3>
                      <img src="../../assets/energy.png" alt="" />
                    </NFTCardStatsRowWithImg>
                  </NFTCardStatsRow>
                  <NFTCardStatsRow>
                    <h3 id="description">Speciality</h3>
                    <h3 id="stat">Asteroid</h3>
                  </NFTCardStatsRow>
                  <NFTCardStatsRow>
                    <h3 id="description">APR / Max</h3>
                    <h3 id="stat">INF% / INF%</h3>
                  </NFTCardStatsRow>
                  <NFTCardStatsRow>
                    <h3 id="description">Level / Max</h3>
                    <h3 id="stat">1 / 20</h3>
                  </NFTCardStatsRow>
                  <NFTCardStatsRow>
                    <h3 id="description">Power / Max</h3>
                    <h3 id="stat">x0.30 / 35.70</h3>
                  </NFTCardStatsRow>
                  <NFTCardStatsRow>
                    <h3 id="description">Minted / Max</h3>
                    <h3 id="stat">{alt2MintedQuantity}/150</h3>
                  </NFTCardStatsRow>
                </NFTCardStats>
                <ButtonContainer>
                  {connected ? (
                    <>
                      {launchTime > 0 ? (
                        <>
                          <Button disable={true}>
                            {secondsToHms(launchTime)}
                          </Button>
                        </>
                      ) : (
                        <>
                          {energyApproved ? (
                            <>
                              {alt2MintedQuantity === "150" ? (
                                <ButtonGray>Minted Out</ButtonGray>
                              ) : (
                                <>
                                  {energyBalance >= 90 ? (
                                    <Button
                                      onClick={() => handleAltMint(2)}
                                      disable={disableButtons}
                                    >
                                      Mint Drill
                                    </Button>
                                  ) : (
                                    <Button disable={true}>
                                      Not Enough Energy
                                    </Button>
                                  )}
                                </>
                              )}
                            </>
                          ) : (
                            <Button
                              onClick={handleEnergyApprove}
                              disable={disableButtons}
                            >
                              Approve ENERGY
                            </Button>
                          )}
                        </>
                      )}
                    </>
                  ) : (
                    <Button
                      onClick={() => activate(injected)}
                      disable={disableButtons}
                    >
                      Connect
                    </Button>
                  )}
                </ButtonContainer>
              </NFTCard>
              <NFTCard>
                <NFTCardHeader>
                  <img
                    src="../../assets/asteroid-drill-levels/level-0-level.png"
                    alt=""
                  />
                  <h1>Asteroid Drill</h1>
                  <img
                    src="../../assets/asteroid-drill-levels/level-0-power.png"
                    alt=""
                  />
                </NFTCardHeader>
                <img
                  id="drill-image"
                  src="../../assets/asteroid-drill-v1.png"
                  alt=""
                />
                <Line width="320px" />
                <NFTCardStats>
                  <NFTCardStatsRow>
                    <h3 id="description">Price</h3>
                    <NFTCardStatsRowWithImg>
                      <h3 id="stat">150 ENERGY</h3>
                      <img src="../../assets/energy.png" alt="" />
                    </NFTCardStatsRowWithImg>
                  </NFTCardStatsRow>
                  <NFTCardStatsRow>
                    <h3 id="description">Speciality</h3>
                    <h3 id="stat">Asteroid</h3>
                  </NFTCardStatsRow>
                  <NFTCardStatsRow>
                    <h3 id="description">APR / Max</h3>
                    <h3 id="stat">INF% / INF%</h3>
                  </NFTCardStatsRow>
                  <NFTCardStatsRow>
                    <h3 id="description">Level / Max</h3>
                    <h3 id="stat">1 / 20</h3>
                  </NFTCardStatsRow>
                  <NFTCardStatsRow>
                    <h3 id="description">Power / Max</h3>
                    <h3 id="stat">x0.30 / 35.70</h3>
                  </NFTCardStatsRow>
                  <NFTCardStatsRow>
                    <h3 id="description">Minted / Max</h3>
                    <h3 id="stat">66/100</h3>
                  </NFTCardStatsRow>
                </NFTCardStats>
                <ButtonContainer>
                  {connected ? (
                    <>
                      {launchTime > 0 ? (
                        <>
                          <Button disable={true}>
                            {secondsToHms(launchTime)}
                          </Button>
                        </>
                      ) : (
                        <>
                          {energyApproved ? (
                            <>
                              {alt3MintedQuantity === "100" ? (
                                <ButtonGray>Minted Out</ButtonGray>
                              ) : (
                                <>
                                  {energyBalance >= 150 ? (
                                    <a
                                      href="https://discord.gg/mineempire"
                                      rel="noreferrer"
                                      target="_blank"
                                    >
                                      <Button disable={disableButtons}>
                                        Request Drill
                                      </Button>
                                    </a>
                                  ) : (
                                    <Button disable={true}>
                                      Not Enough Energy
                                    </Button>
                                  )}
                                </>
                              )}
                            </>
                          ) : (
                            <Button
                              onClick={handleEnergyApprove}
                              disable={disableButtons}
                            >
                              Approve ENERGY
                            </Button>
                          )}
                        </>
                      )}
                    </>
                  ) : (
                    <Button
                      onClick={() => activate(injected)}
                      disable={disableButtons}
                    >
                      Connect
                    </Button>
                  )}
                </ButtonContainer>
              </NFTCard>
            </MarketContainer>
          </BodyContainer>
        </Container>
        <Container>
          <TitleContainer>
            <h3>
              We want to prevent multi address users from taking all of the free
              drills.
            </h3>
            <h3>
              Clicking on the "Request Drill" button (if available) will take
              you to our discord. Open a ticket for a swift drill delivery.
            </h3>
            <h3>
              Only open a ticket if you meet the energy requirements and the
              drill quantity is available.
            </h3>
          </TitleContainer>
        </Container>
      </Section>
    </>
  );
};

export default MarketBody;
