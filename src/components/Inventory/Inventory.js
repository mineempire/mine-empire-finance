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

const InventoryBody = () => {
  const [ownedDrills, setOwnedDrills] = useState([]);
  const [drillsLoaded, setDrillsLoaded] = useState(false);
  const [drillMetadata, setDrillMetadata] = useState();
  const [cosmicCashApproved, setCosmicCashApproved] = useState(false);

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

  async function getDrillMetadata() {
    fetch(drillMetadataIPFSUrl)
      .then((response) => response.json())
      .then((data) => {
        setDrillMetadata(data);
      });
  }

  useEffect(() => {
    getOwnedDrills();
    getDrillMetadata();
    getCosmicCashApproved();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleApprove() {
    const selectedAddress = await injected.getAccount();
    await cosmicCashContract.methods
      .approve(mineEmpireDrillAddress, "10000000000000000000000")
      .send({ from: selectedAddress })
      .catch((err) => console.log(err));
    getCosmicCashApproved();
  }

  async function handleUpgradeDrill(drillId) {
    const selectedAddress = await injected.getAccount();
    await mineEmpireDrillContract.methods
      .upgradeDrill(drillId)
      .send({ from: selectedAddress })
      .catch((err) => console.log(err));
    getOwnedDrills();
    getDrillMetadata();
    setDrillsLoaded(false);
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
                            x
                            {drillMetadata
                              ? +drillMetadata["power"][+drill.level + 1] / 100
                              : 0}
                          </h3>
                        </DrillStatsRow>
                        <DrillStatsRow>
                          <h3 id="description">Upgrade Cost</h3>
                          <DrillStatsRowWithImg>
                            <h3 id="stat">
                              {drillMetadata
                                ? +drillMetadata["upgrade"][+drill.level + 1]
                                : 0}
                            </h3>
                            <img src="../../assets/csc-icon.png" alt="" />
                          </DrillStatsRowWithImg>
                        </DrillStatsRow>
                      </DrillStats>
                      <ButtonContainer>
                        {cosmicCashApproved ? (
                          <>
                            {+drill.level === 19 ? (
                              <ButtonGray>MAX</ButtonGray>
                            ) : (
                              <Button
                                onClick={() =>
                                  handleUpgradeDrill(drill.drillId)
                                }
                              >
                                Upgrade Drill
                              </Button>
                            )}
                          </>
                        ) : (
                          <Button onClick={handleApprove}>Approve CSC</Button>
                        )}
                      </ButtonContainer>
                    </DrillCard>
                  ))}
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
