import {
  BodyContainer,
  Container,
  TitleContainer,
  Section,
  Line,
  Button,
  ButtonContainer,
  ButtonGray,
} from "../../globalStyles";
import { useEffect, useState } from "react";
import {
  isConnected,
  getEnergyContract,
  getMineEmpireDrillContract,
  getBalance,
  getCosmicCashContract,
} from "../../Web3Client";

import {
  NFTCard,
  NFTCardHeader,
  NFTCardStats,
  MarketContainer,
  NFTCardStatsRow,
  NFTCardStatsRowWithImg,
} from "./MarketStyles";
import {
  energyAddress,
  mineEmpireDrillAddress,
} from "../../contracts/Addresses";
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
  const [energyApproved, setEnergyApproved] = useState(false);
  const [cosmicCashApproved, setCosmicCashApproved] = useState(false);
  const [energyBalance, setEnergyBalance] = useState(0);
  const [cosmicCashBalance, setcosmicCashBalance] = useState(0);
  const [disableButtons, setDisableButtons] = useState(false);
  const miningPower = 30;
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
    updateState();
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
                  src="../../assets/asteroid-drill.png"
                  alt=""
                />
                <Line width="320px" />
                <NFTCardStats>
                  <NFTCardStatsRow>
                    <h3 id="description">Price</h3>
                    <NFTCardStatsRowWithImg>
                      <h3 id="stat">223 CSC</h3>
                      <img src="../../assets/csc-icon.png" alt="" />
                    </NFTCardStatsRowWithImg>
                  </NFTCardStatsRow>
                  <NFTCardStatsRow>
                    <h3 id="description">Speciality</h3>
                    <h3 id="stat">Asteroid</h3>
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
                      {cosmicCashApproved ? (
                        <>
                          {alt4MintedQuantity === "200" ? (
                            <ButtonGray>Minted Out</ButtonGray>
                          ) : (
                            <>
                              {cosmicCashBalance >= 223 ? (
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
                          Approve
                        </Button>
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
                  src="../../assets/asteroid-drill.png"
                  alt=""
                />
                <Line width="320px" />
                <NFTCardStats>
                  <NFTCardStatsRow>
                    <h3 id="description">Price</h3>
                    <NFTCardStatsRowWithImg>
                      <h3 id="stat">652 CSC</h3>
                      <img src="../../assets/csc-icon.png" alt="" />
                    </NFTCardStatsRowWithImg>
                  </NFTCardStatsRow>
                  <NFTCardStatsRow>
                    <h3 id="description">Speciality</h3>
                    <h3 id="stat">Asteroid</h3>
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
                      {cosmicCashApproved ? (
                        <>
                          {alt5MintedQuantity === "50" ? (
                            <ButtonGray>Minted Out</ButtonGray>
                          ) : (
                            <>
                              {cosmicCashBalance >= 652 ? (
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
                          Approve
                        </Button>
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
                  src="../../assets/asteroid-drill.png"
                  alt=""
                />
                <Line width="320px" />
                <NFTCardStats>
                  <NFTCardStatsRow>
                    <h3 id="description">Price</h3>
                    <NFTCardStatsRowWithImg>
                      <h3 id="stat">1297 CSC</h3>
                      <img src="../../assets/csc-icon.png" alt="" />
                    </NFTCardStatsRowWithImg>
                  </NFTCardStatsRow>
                  <NFTCardStatsRow>
                    <h3 id="description">Speciality</h3>
                    <h3 id="stat">Asteroid</h3>
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
                      {cosmicCashApproved ? (
                        <>
                          {alt6MintedQuantity === "20" ? (
                            <ButtonGray>Minted Out</ButtonGray>
                          ) : (
                            <>
                              {cosmicCashBalance >= 1297 ? (
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
                          Approve
                        </Button>
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
                  src="../../assets/asteroid-drill.png"
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
                          Approve
                        </Button>
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
                  src="../../assets/asteroid-drill.png"
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
                          Approve
                        </Button>
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
                  src="../../assets/asteroid-drill.png"
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
                    <h3 id="description">Level / Max</h3>
                    <h3 id="stat">1 / 20</h3>
                  </NFTCardStatsRow>
                  <NFTCardStatsRow>
                    <h3 id="description">Power / Max</h3>
                    <h3 id="stat">x0.30 / 35.70</h3>
                  </NFTCardStatsRow>
                  <NFTCardStatsRow>
                    <h3 id="description">Minted / Max</h3>
                    <h3 id="stat">{alt3MintedQuantity}/100</h3>
                  </NFTCardStatsRow>
                </NFTCardStats>
                <ButtonContainer>
                  {connected ? (
                    <>
                      {energyApproved ? (
                        <>
                          {alt3MintedQuantity === "100" ? (
                            <ButtonGray>Minted Out</ButtonGray>
                          ) : (
                            <>
                              {energyBalance >= 150 ? (
                                <Button
                                  onClick={() => handleAltMint(3)}
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
                          Approve
                        </Button>
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
      </Section>
    </>
  );
};

export default MarketBody;
