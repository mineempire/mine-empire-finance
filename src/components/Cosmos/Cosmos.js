import {
  BodyContainer,
  Container,
  TitleContainer,
  Section,
  Line,
} from "../../globalStyles";
import { Link } from "react-router-dom";

import {
  PlanetCard,
  PlanetCardImgContainer,
  PlanetCardTitleContainer,
  PlanetCardProductionInfo,
  CardStats,
} from "./CosmosStyles";

import { Button, ButtonContainer } from "../../globalStyles";
import { useEffect, useState } from "react";
import { getGadesContract, isConnected } from "../../Web3Client";
import { injected } from "../../connectors";
import { useWeb3React } from "@web3-react/core";
import { AsteroidDrillPower } from "../../stats/DrillStats";
import { ethers } from "ethers";

const CosmosBody = () => {
  const [connected, setConnected] = useState(false);
  const [ironProduction, setIronProduction] = useState(0);
  const [ironReadyToCollect, setIronReadyToCollect] = useState(0);
  const [gadesLevel, setGadesLevel] = useState(1);
  const { activate } = useWeb3React();
  const gadesContract = getGadesContract();

  async function getGadesStats() {
    const addr = await injected.getAccount();
    let baseProduction = 0;
    await gadesContract.methods
      .getBaseProduction()
      .call()
      .then((result) => {
        baseProduction = +ethers.utils.formatEther(result);
      });
    await gadesContract.methods
      .getStake(addr)
      .call()
      .then((stake) => {
        const drillId = stake[0];
        if (drillId === "0") {
          return;
        } else {
          const level = +stake["drill"]["level"];
          const mult = AsteroidDrillPower[level];
          const prodPerDay = Math.floor(
            (baseProduction * 60 * 60 * 24 * mult) / 100
          );
          setIronProduction(prodPerDay);
        }
      });
    await gadesContract.methods
      .getAccumulatedIron(addr)
      .call()
      .then((result) => {
        const amt = Math.floor(ethers.utils.formatEther(result));
        setIronReadyToCollect(amt);
      })
      .catch((err) => console.log(err));
    await gadesContract.methods
      .getUserLevel(addr)
      .call()
      .then((result) => {
        setGadesLevel(+result + 1);
      });
  }

  async function updateState() {
    if (await isConnected()) {
      setConnected(true);
      await getGadesStats();
    }
  }

  useEffect(() => {
    updateState();
  });
  return (
    <>
      <Section>
        <Container>
          <TitleContainer>
            <h1>Explore the Cosmos</h1>
            <h3>
              Each planet produces a unique resource. Stake up to one drill per
              planet to start earning!
            </h3>
            <h3>
              Convert resources to Cosmic Cash using the Converter or refine
              them into more valueable resources.
            </h3>
          </TitleContainer>
        </Container>
        <Container>
          <BodyContainer>
            <PlanetCard>
              <PlanetCardImgContainer>
                <img src="../../assets/gades.png" alt="" />
              </PlanetCardImgContainer>
              <PlanetCardTitleContainer>
                <h1>Gades</h1>
                <h3>Asteroid</h3>
                <h3>Produces Iron</h3>
              </PlanetCardTitleContainer>
              <Line width="360px" />
              <PlanetCardProductionInfo>
                <img src="../../assets/iron60px.png" alt="" />
                <h3 id="production">Production:</h3>
                <h3 id="amount">3405 / Day</h3>
              </PlanetCardProductionInfo>
              <CardStats>
                <h3 id="description">Your Production</h3>
                <h3 id="stat">{ironProduction} Iron / Day</h3>
                <h3 id="description">Max Production</h3>
                <h3 id="stat">121.6k Iron / Day</h3>
                <h3 id="description">Your CSC Equiv</h3>
                <h3 id="stat">
                  {Math.floor((ironProduction / 13809) * 1000000) / 1000000} CSC
                  / Day
                </h3>
                <h3 id="description">Max CSC Equiv</h3>
                <h3 id="stat">8.8 CSC / Day</h3>
                <h3 id="description">Capacity Level</h3>
                <h3 id="stat">{gadesLevel}</h3>
                <h3 id="description">Ready to Collect</h3>
                <h3 id="stat">{ironReadyToCollect} / 10,215</h3>
              </CardStats>
              <ButtonContainer>
                {connected ? (
                  <Link to="gades">
                    <Button>View</Button>
                  </Link>
                ) : (
                  <Button onClick={() => activate(injected)}>Connect</Button>
                )}
              </ButtonContainer>
            </PlanetCard>
            <PlanetCard>
              <PlanetCardImgContainer>
                <img src="../../assets/oberon.png" alt="" />
              </PlanetCardImgContainer>
              <PlanetCardTitleContainer>
                <h1>Oberon</h1>
                <h3>Asteroid</h3>
                <h3>Produces Cobalt</h3>
              </PlanetCardTitleContainer>
              <Line width="360px" />
              <PlanetCardProductionInfo>
                <img src="../../assets/cobalt.png" alt="" />
                <h3 id="production">Production:</h3>
                <h3 id="amount">835 / Day</h3>
              </PlanetCardProductionInfo>
              <CardStats>
                <h3 id="description">Your Production</h3>
                <h3 id="stat">0 Cobalt / Day</h3>
                <h3 id="description">Max Production</h3>
                <h3 id="stat">29.8k Cobalt / Day</h3>
                <h3 id="description">Your CSC Equiv</h3>
                <h3 id="stat">0 CSC / Day</h3>
                <h3 id="description">Max CSC Equiv</h3>
                <h3 id="stat">11.3 CSC / Day</h3>
                <h3 id="description">Capacity Level</h3>
                <h3 id="stat">1</h3>
                <h3 id="description">Ready to Collect</h3>
                <h3 id="stat">0 / 2505</h3>
              </CardStats>
              <ButtonContainer>
                {connected ? (
                  // <Link to="oberon">
                  <Button>Coming Soon</Button>
                ) : (
                  <Button onClick={() => activate(injected)}>Connect</Button>
                )}
              </ButtonContainer>
            </PlanetCard>
            <PlanetCard>
              <PlanetCardImgContainer>
                <img src="../../assets/canopsys.png" alt="" />
              </PlanetCardImgContainer>
              <PlanetCardTitleContainer>
                <h1>Canopsys Prime</h1>
                <h3>Planet</h3>
                <h3>Produces Bismuth</h3>
              </PlanetCardTitleContainer>
              <Line width="360px" />
              <PlanetCardProductionInfo>
                <img src="../../assets/bismuth.png" alt="" />
                <h3 id="production">Production:</h3>
                <h3 id="amount">179 / Day</h3>
              </PlanetCardProductionInfo>
              <CardStats>
                <h3 id="description">Your Production</h3>
                <h3 id="stat">0 Bismuth / Day</h3>
                <h3 id="description">Max Production</h3>
                <h3 id="stat">6.4k Bismuth / Day</h3>
                <h3 id="description">Your CSC Equiv</h3>
                <h3 id="stat">0 CSC / Day</h3>
                <h3 id="description">Max CSC Equiv</h3>
                <h3 id="stat">13.6 CSC / Day</h3>
                <h3 id="description">Capacity Level</h3>
                <h3 id="stat">1</h3>
                <h3 id="description">Ready to Collect</h3>
                <h3 id="stat">0 / 537</h3>
              </CardStats>
              <ButtonContainer>
                {connected ? (
                  // <Link to="canopsysprime">
                  <Button>Coming Soon</Button>
                ) : (
                  <Button onClick={() => activate(injected)}>Connect</Button>
                )}
              </ButtonContainer>
            </PlanetCard>
          </BodyContainer>
        </Container>
      </Section>
    </>
  );
};

export default CosmosBody;
