import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { injected } from "../../connectors";
import { gadesAddress } from "../../contracts/Addresses";
import {
  Container,
  TitleContainer,
  Section,
  BodyContainer,
  Button,
  Line,
  Space,
  ButtonContainer,
} from "../../globalStyles";
import { getGadesContract, getMineEmpireDrillContract } from "../../Web3Client";
import DrillSelectorMenu from "../Planet/DrillSelectorMenu";
import {
  DescriptionContainer,
  DescriptionRow,
  PlanetBody,
  PlanetTitle,
  PlanetTitleContainer,
  StakeContainer,
  ConverterContainer,
  PlanetBodyContainer,
  ConversionBox,
  SelectDrillModal,
  SelectDrillModalBg,
  PlanetButtonContainer,
} from "../Planet/PlanetStyles";

const GadesBody = () => {
  let selectedAddress = "";
  const [ownedDrills, setOwnedDrills] = useState([]);
  const [drillStaked, setDrillStaked] = useState(0);
  const [drillSelected, setDrillSelected] = useState(0);
  const [showSelect, setShowSelect] = useState(false);
  const [drillApproved, setDrillApproved] = useState(false);

  const [drillId, setDrillId] = useState(0);
  const [drillLevel, setDrillLevel] = useState(0);
  const [drillMultiplier, setDrillMultiplier] = useState(0);
  const [collected, setCollected] = useState(0);

  const gadesContract = getGadesContract();
  const mineEmpireDrillContract = getMineEmpireDrillContract();

  async function selectDrill(drillId) {
    setDrillSelected(drillId);
  }

  async function getCollectedIron() {
    selectedAddress = await injected.getAccount();
    await gadesContract.methods
      .getAccumulatedIron(selectedAddress)
      .call()
      .then((result) => {
        setCollected(Math.floor(+ethers.utils.formatEther(result)));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function getStakeInfo() {
    await gadesContract.methods
      .getStake(selectedAddress)
      .call()
      .then((stake) => {
        console.log(stake);
        const drillId = stake[0];
        if (drillId === "0") {
          setDrillStaked(false);
          setDrillId(0);
          setDrillLevel(0);
          setDrillMultiplier(0);
        } else {
          setDrillSelected(true);
          setDrillStaked(true);
          setDrillId(stake["drill"]["drillId"]);
          setDrillLevel(+stake["drill"]["level"] + 1);
          setDrillMultiplier(0);
          getCollectedIron();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function getOwnedDrills() {
    let ownedDrillsFetch = [];
    let totalSupply = 0;
    await mineEmpireDrillContract.methods
      .nextDrillId()
      .call()
      .then((result) => {
        totalSupply = result;
      })
      .catch((err) => {
        console.log(err);
      });
    let ownedDrillIds = [];
    const addr = selectedAddress;
    for (let i = 1; i < totalSupply; i++) {
      await mineEmpireDrillContract.methods
        .ownerOf(i)
        .call()
        .then((ownerOfDrill) => {
          if (String(ownerOfDrill).toLowerCase() === addr) {
            ownedDrillIds.push(i);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    for (let i = 0; i < ownedDrillIds.length; i++) {
      await mineEmpireDrillContract.methods
        .getDrill(ownedDrillIds[i])
        .call()
        .then((drill) => {
          ownedDrillsFetch.push({
            drillId: ownedDrillIds[i],
            drillType: drill["drillType"],
            level: drill["level"],
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    console.log(ownedDrillsFetch);
    setOwnedDrills(ownedDrillsFetch);
  }

  async function updateState() {
    selectedAddress = await injected.getAccount();
    await getStakeInfo();
    await getOwnedDrills();
  }

  async function handleApprove() {
    if (drillSelected === 0) {
      console.log("drill not selected");
      return;
    }
    selectedAddress = await injected.getAccount();
    await mineEmpireDrillContract.methods
      .approve(gadesAddress, drillSelected)
      .send({ from: selectedAddress });
    setDrillApproved(true);
  }

  async function handleStake() {
    selectedAddress = await injected.getAccount();
    await gadesContract.methods
      .stake(drillSelected)
      .send({ from: selectedAddress });
    await getStakeInfo();
  }

  async function handleCollectIron() {
    selectedAddress = await injected.getAccount();
    await gadesContract.methods
      .collectIron()
      .send({ from: selectedAddress })
      .then((result) => {
        console.log("collect iron result");
        console.log(result);
      })
      .catch((err) => console.log(err));
    await getCollectedIron();
  }

  async function handleUnstakeDrill() {
    selectedAddress = await injected.getAccount();
    await gadesContract.methods
      .unstake()
      .send({ from: selectedAddress })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => console.log(err));
    await getStakeInfo();
    setDrillSelected(0);
    await getOwnedDrills();
  }

  useEffect(() => {
    updateState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // website
  const handleSelectDrill = () => {
    setShowSelect(!showSelect);
  };

  const handleDisableSelect = () => {
    setShowSelect(false);
  };

  return (
    <>
      <Section>
        <Container>
          <TitleContainer>
            <h1>Gades</h1>
          </TitleContainer>
        </Container>
        <Container>
          <BodyContainer>
            <SelectDrillModalBg
              showSelect={showSelect}
              onClick={handleDisableSelect}
            >
              <SelectDrillModal>
                <DrillSelectorMenu
                  selectDrill={selectDrill}
                  ownedDrills={ownedDrills}
                ></DrillSelectorMenu>
              </SelectDrillModal>
            </SelectDrillModalBg>
            <PlanetBodyContainer>
              <PlanetBody>
                <StakeContainer>
                  <PlanetTitleContainer>
                    <img src="../../assets/gades.png" alt="" />
                    <PlanetTitle>
                      <h1 id="title">Gades</h1>
                      <h1 id="description">Asteroid</h1>
                    </PlanetTitle>
                  </PlanetTitleContainer>
                  <Line width="320px" />
                  <Space height="60px" />
                  <DescriptionRow>
                    <h3 id="description">Staked Drill</h3>
                    <h3 id="value">#{drillId}</h3>
                  </DescriptionRow>
                  <DescriptionRow>
                    <h3 id="description">Drill Level</h3>
                    <h3 id="value">{drillLevel}</h3>
                  </DescriptionRow>
                  <DescriptionRow>
                    <h3 id="description">Drill Multiplier</h3>
                    <h3 id="value">x{drillMultiplier}</h3>
                  </DescriptionRow>
                  <DescriptionRow>
                    <h3 id="description">Collected</h3>
                    <h3 id="value">{collected}/7945</h3>
                  </DescriptionRow>
                  <PlanetButtonContainer>
                    {drillStaked ? (
                      <>
                        <ButtonContainer>
                          <Button onClick={handleCollectIron}>Collect</Button>
                        </ButtonContainer>
                        <ButtonContainer>
                          <Button onClick={handleUnstakeDrill}>Unstake</Button>
                        </ButtonContainer>
                      </>
                    ) : (
                      <>
                        {drillSelected !== 0 ? (
                          <>
                            <ButtonContainer>
                              <Button onClick={handleSelectDrill}>
                                Select Drill
                              </Button>
                            </ButtonContainer>
                            {drillApproved ? (
                              <ButtonContainer>
                                <Button onClick={handleStake}>
                                  Stake #{drillSelected}
                                </Button>
                              </ButtonContainer>
                            ) : (
                              <ButtonContainer>
                                <Button onClick={handleApprove}>
                                  Approve #{drillSelected}
                                </Button>
                              </ButtonContainer>
                            )}
                          </>
                        ) : (
                          <ButtonContainer>
                            <Button onClick={handleSelectDrill}>
                              Select Drill
                            </Button>
                          </ButtonContainer>
                        )}
                      </>
                    )}
                  </PlanetButtonContainer>
                </StakeContainer>
              </PlanetBody>
              <DescriptionContainer>
                <PlanetTitle>
                  <h1 id="title">Gades Stats</h1>
                </PlanetTitle>
                <Line width="320px" />
                <DescriptionRow>
                  <h3 id="description">Type</h3>
                  <h3 id="value">Asteroid</h3>
                </DescriptionRow>
                <DescriptionRow>
                  <h3 id="description">Production Resource</h3>
                  <h3 id="value">Iron</h3>
                </DescriptionRow>
                <DescriptionRow>
                  <h3 id="description">Base Production</h3>
                  <h3 id="value">1,135 / Day</h3>
                </DescriptionRow>
                <DescriptionRow>
                  <h3 id="description">Your Production</h3>
                  <h3 id="value">1,135 / Day</h3>
                </DescriptionRow>
                <DescriptionRow>
                  <h3 id="description">Capacity Level</h3>
                  <h3 id="value">1 / 10</h3>
                </DescriptionRow>
                <DescriptionRow>
                  <h3 id="description">Capacity</h3>
                  <h3 id="value">7,945</h3>
                </DescriptionRow>
                <DescriptionRow>
                  <h3 id="description">Next Level Capacity</h3>
                  <h3 id="value">7,945</h3>
                </DescriptionRow>
                <DescriptionRow>
                  <h3 id="description">Upgrade Cost</h3>
                  <h3 id="value">25 FTM</h3>
                </DescriptionRow>
                <PlanetButtonContainer>
                  <ButtonContainer>
                    <Button>Upgrade</Button>
                  </ButtonContainer>
                </PlanetButtonContainer>
              </DescriptionContainer>
            </PlanetBodyContainer>
            <ConverterContainer>
              <ConversionBox>
                <img src="../../assets/iron60px.png" alt="" />
                <p>1 = 0.000072416</p>
                <img src="../../assets/csc-icon.png" alt="" />
              </ConversionBox>
              <ConversionBox>
                <img src="../../assets/csc-icon.png" alt="" />
                <p>1 = 13809</p>
                <img src="../../assets/iron60px.png" alt="" />
              </ConversionBox>
            </ConverterContainer>
          </BodyContainer>
        </Container>
      </Section>
    </>
  );
};

export default GadesBody;
