import { useState } from "react";
import { injected } from "../../connectors";
import {
  BodyContainer,
  Button,
  ButtonContainer,
  Container,
  Line,
  Section,
  TitleContainer,
} from "../../globalStyles";
import { AsteroidDrillPower } from "../../stats/DrillStats";
import { getMineEmpireDrillContract } from "../../Web3Client";
import {
  MarketContainer,
  NFTCard,
  NFTCardHeader,
  NFTCardStats,
  NFTCardStatsRow,
} from "../Market/MarketStyles";

const RewardsBody = () => {
  const [asteroidDrillLevel, setAsteroidDrillLevel] = useState("?");
  const [asteroidDrillChecked, setDrillChecked] = useState(false);

  const mineEmpireDrillContract = getMineEmpireDrillContract();

  const handleCheckRewards = async () => {
    const addr = await injected.getAccount();
    for (let i = 0; i <= 5; i++) {
      await mineEmpireDrillContract.methods
        .freeMints(addr, 1, i)
        .call()
        .then((result) => {
          if (+result > 0) {
            setAsteroidDrillLevel(i);
          }
          setDrillChecked(true);
        });
    }
  };

  const handleFreeMint = async () => {
    if (asteroidDrillLevel === "?") return;
    const addr = await injected.getAccount();
    await mineEmpireDrillContract.methods
      .freeMintDrill(1, +asteroidDrillLevel)
      .send({ from: addr })
      .then()
      .catch((err) => console.log(err));
  };

  function getNFTCard(level) {
    let lvSrc = level;
    let power = "?";
    if (lvSrc === "?") lvSrc = "_";
    else {
      power = "x" + AsteroidDrillPower[+level] / 100;
    }
    const lvsrc =
      "../../assets/asteroid-drill-levels/level-" + lvSrc + "-level.png";
    const pwsrc =
      "../../assets/asteroid-drill-levels/level-" + lvSrc + "-power.png";
    return (
      <>
        <NFTCard>
          <NFTCardHeader>
            <img src={lvsrc} alt="" />
            <h1>Asteroid Drill</h1>
            <img src={pwsrc} alt="" />
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
              <h3 id="stat">Free</h3>
            </NFTCardStatsRow>
            <NFTCardStatsRow>
              <h3 id="description">Speciality</h3>
              <h3 id="stat">Asteroid</h3>
            </NFTCardStatsRow>
            <NFTCardStatsRow>
              <h3 id="description">Level / Max</h3>
              <h3 id="stat">{level === "?" ? level : +level + 1} / 20</h3>
            </NFTCardStatsRow>
            <NFTCardStatsRow>
              <h3 id="description">Power / Max</h3>
              <h3 id="stat">{power} / 35.70</h3>
            </NFTCardStatsRow>
          </NFTCardStats>
          <ButtonContainer>
            {asteroidDrillLevel === "?" ? (
              <>
                {asteroidDrillChecked ? (
                  <>
                    <Button disable={true}>No Rewards Found</Button>
                  </>
                ) : (
                  <>
                    <Button onClick={handleCheckRewards}>
                      Check for Rewards
                    </Button>
                  </>
                )}
              </>
            ) : (
              <>
                <Button onClick={handleFreeMint}>Mint</Button>
              </>
            )}
          </ButtonContainer>
        </NFTCard>
      </>
    );
  }

  return (
    <>
      <Section>
        <Container>
          <TitleContainer>
            <h1>Rewards & Airdrops</h1>
            <h3>Claim your airdrops and other rewards here.</h3>
          </TitleContainer>
        </Container>
        <Container>
          <BodyContainer>
            <MarketContainer>{getNFTCard(asteroidDrillLevel)}</MarketContainer>
          </BodyContainer>
        </Container>
      </Section>
    </>
  );
};

export default RewardsBody;
