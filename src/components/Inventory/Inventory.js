import {
  BodyContainer,
  Button,
  ButtonContainer,
  ButtonGray,
  Container,
  Line,
  Section,
  TitleContainer,
} from "../../globalStyles";
import { injected } from "../../connectors";
import { useEffect, useState } from "react";
import {
  getCosmicCashContract,
  getMineEmpireDrillContract,
} from "../../Web3Client";
import {
  AsteroidDrillInventory,
  DrillCard,
  DrillCardHeader,
  DrillStats,
  DrillStatsRow,
  DrillStatsRowWithImg,
  InventoryLoading,
} from "./InventoryStyles";
import {
  drillMetadataIPFSUrl,
  mineEmpireDrillAddress,
} from "../../contracts/Addresses";
import { ethers } from "ethers";
import {
  AsteroidDrillPower,
  AsteroidDrillUpgradeCost,
} from "../../stats/DrillStats";

const InventoryBody = () => {
  const [ownedDrills, setOwnedDrills] = useState([]);
  const [drillsLoaded, setDrillsLoaded] = useState(false);
  const [drillMetadata, setDrillMetadata] = useState();
  const [cosmicCashApproved, setCosmicCashApproved] = useState(false);
  const [disableButtons, setDisableButtons] = useState(false);
  const [cosmicCashBalance, setCosmicCashBalance] = useState(0);

  const mineEmpireDrillContract = getMineEmpireDrillContract();
  const cosmicCashContract = getCosmicCashContract();

  async function getOwnedDrills() {
    let fetchedDrills = [];
    const addr = await injected.getAccount();
    let ids = new Set();
    let url =
      "https://api-testnet.ftmscan.com/api?module=account&action=tokennfttx&contractaddress=" +
      mineEmpireDrillAddress +
      "&address=" +
      addr +
      "&startblock=0&endblock=99999999&page=1&offset=100&sort=asc&apikey=SJDG322KQRHG7MHWPVY9T4EMWEW4361ZGT";
    console.log(url);
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const result = data["result"];
        for (let i = 0; i < result.length; i++) {
          if (result[i]["to"] === addr) {
            ids.add(result[i]["tokenID"]);
          } else if (result[i]["from"] === addr) {
            ids.delete(result[i]["tokenID"]);
          }
        }
      });
    const itr = ids.keys();
    for (const key of itr) {
      await mineEmpireDrillContract.methods
        .getDrill(key)
        .call()
        .then((drill) => {
          fetchedDrills.push({
            drillId: key,
            drillType: drill["drillType"],
            level: drill["level"],
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }

    setDrillsLoaded(true);
    setOwnedDrills(fetchedDrills);
  }

  async function getCosmicCashApproved() {
    const selectedAddress = await injected.getAccount();
    await cosmicCashContract.methods
      .allowance(selectedAddress, mineEmpireDrillAddress)
      .call()
      .then((result) => {
        const amount = ethers.utils.formatEther(result).substring(0, 7);
        if (+amount < 100) {
          setCosmicCashApproved(false);
        } else {
          setCosmicCashApproved(true);
        }
      });
  }

  async function getCosmicCashBalance() {
    const addr = await injected.getAccount();
    await cosmicCashContract.methods
      .balanceOf(addr)
      .call()
      .then((result) => {
        const amount = ethers.utils.formatEther(result);
        setCosmicCashBalance(+amount);
      });
  }

  async function getDrillMetadata() {
    setDrillMetadata({
      power: AsteroidDrillPower,
      upgrade: AsteroidDrillUpgradeCost,
    });
  }

  useEffect(() => {
    getOwnedDrills();
    getDrillMetadata();
    getCosmicCashApproved();
    getCosmicCashBalance();
    const intervalId = setInterval(() => {
      getOwnedDrills();
      getDrillMetadata();
      getCosmicCashApproved();
      getCosmicCashBalance();
    }, 5000);
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleApprove() {
    if (disableButtons) return;
    setDisableButtons(true);
    const selectedAddress = await injected.getAccount();
    await cosmicCashContract.methods
      .approve(mineEmpireDrillAddress, "10000000000000000000000")
      .send({ from: selectedAddress })
      .catch((err) => console.log(err));
    await getCosmicCashApproved();
    setDisableButtons(false);
  }

  async function handleUpgradeDrill(drillId) {
    if (disableButtons) return;
    setDisableButtons(true);
    const selectedAddress = await injected.getAccount();
    await mineEmpireDrillContract.methods
      .upgradeDrill(drillId)
      .send({ from: selectedAddress })
      .catch((err) => console.log(err));
    await getOwnedDrills();
    await getDrillMetadata();
    setDrillsLoaded(false);
    setDisableButtons(false);
  }

  return (
    <>
      <Section>
        <Container>
          <TitleContainer>
            <h1>Inventory</h1>
            <h3>View your drills, resources and relics in one place!</h3>
            <h3>Visit the market to purchase items.</h3>
          </TitleContainer>
        </Container>
        <Container>
          <BodyContainer>
            <AsteroidDrillInventory>
              {drillsLoaded ? (
                <>
                  {ownedDrills.length === 0 ? (
                    <>
                      <h3>
                        No Drills found in your wallet! They might be staked in
                        the Cosmos. Visit the Market to buy more drills!
                      </h3>
                    </>
                  ) : (
                    <>
                      {ownedDrills.map((drill, index) => (
                        <DrillCard key={index}>
                          <DrillCardHeader>
                            <img
                              src={
                                "../../assets/asteroid-drill-levels/level-" +
                                drill.level +
                                "-level.png"
                              }
                              alt=""
                            />
                            <h1>Asteroid Drill #{drill.drillId}</h1>
                            <img
                              src={
                                "../../assets/asteroid-drill-levels/level-" +
                                drill.level +
                                "-power.png"
                              }
                              alt=""
                            />
                          </DrillCardHeader>
                          <img
                            id="drill-image"
                            src="../../assets/asteroid-drill.png"
                            alt=""
                          />
                          <Line width="320px" />
                          <DrillStats>
                            <DrillStatsRow>
                              <h3 id="description">Next Level Power</h3>
                              <h3 id="stat">
                                {+drill.level < 19
                                  ? "x" +
                                    drillMetadata["power"][+drill.level + 1] /
                                      100
                                  : "MAX"}
                              </h3>
                            </DrillStatsRow>
                            <DrillStatsRow>
                              <h3 id="description">Upgrade Cost</h3>
                              <DrillStatsRowWithImg>
                                <h3 id="stat">
                                  {+drill.level < 19
                                    ? drillMetadata["upgrade"][+drill.level + 1]
                                    : 0}
                                </h3>
                                <img src="../../assets/csc-icon.png" alt="" />
                              </DrillStatsRowWithImg>
                            </DrillStatsRow>
                          </DrillStats>
                          <ButtonContainer>
                            {cosmicCashApproved ? (
                              <>
                                {cosmicCashBalance <=
                                drillMetadata["upgrade"][+drill.level + 1] ? (
                                  <>
                                    <Button>Get Cosmic Cash</Button>
                                  </>
                                ) : (
                                  <>
                                    {+drill.level === 19 ? (
                                      <ButtonGray>MAX</ButtonGray>
                                    ) : (
                                      <Button
                                        onClick={() =>
                                          handleUpgradeDrill(drill.drillId)
                                        }
                                        disable={disableButtons}
                                      >
                                        Upgrade Drill
                                      </Button>
                                    )}
                                  </>
                                )}
                              </>
                            ) : (
                              <Button
                                onClick={handleApprove}
                                disable={disableButtons}
                              >
                                Approve CSC
                              </Button>
                            )}
                          </ButtonContainer>
                        </DrillCard>
                      ))}
                    </>
                  )}
                </>
              ) : (
                <>
                  <InventoryLoading>
                    <p>Loading inventory...</p>
                  </InventoryLoading>
                </>
              )}
            </AsteroidDrillInventory>
          </BodyContainer>
        </Container>
      </Section>
    </>
  );
};

export default InventoryBody;
