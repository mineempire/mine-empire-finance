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
import { GadesCapacity } from "../../stats/GadesStats";
import { cosmicCashAddress } from "../../contracts/Addresses";

const CosmosBody = () => {
  const [connected, setConnected] = useState(false);
  const [ironProduction, setIronProduction] = useState(0);
  const [cscProduction, setCscProduction] = useState(0);
  const [ironReadyToCollect, setIronReadyToCollect] = useState(0);
  const [gadesLevel, setGadesLevel] = useState(1);
  const [gadesCapacity, setGadesCapacity] = useState(0);
  const [cosmicCashPrice, setCosmicCashPrice] = useState(0);
  const [launchTime, setLaunchTime] = useState(0);
  const { activate } = useWeb3React();
  const gadesContract = getGadesContract();

  async function getStakedStats() {
    const addr = await injected.getAccount();
    await gadesContract.methods
      .getAccumulatedIron(addr)
      .call()
      .then((result) => {
        const amt = Math.floor(ethers.utils.formatEther(result));
        setIronReadyToCollect(amt);
      })
      .catch((err) => console.log(err));
  }

  async function getCosmicCashPrice() {
    let url =
      "https://api.dexscreener.com/latest/dex/tokens/" + cosmicCashAddress;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const priceUsd = data["pairs"][0]["priceUsd"];
        setCosmicCashPrice(priceUsd);
      });
  }

  async function getGadesStats() {
    const addr = await injected.getAccount();
    let baseProduction = 0;
    let checkStaked = true;
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
          checkStaked = false;
        } else {
          const level = +stake["drill"]["level"];
          const mult = AsteroidDrillPower[level];
          const prodPerDay = Math.floor(
            (baseProduction * 60 * 60 * 24 * mult) / 100
          );
          setIronProduction(prodPerDay);
          setCscProduction(
            Math.floor((ironProduction / 13809) * 1000000) / 1000000
          );
        }
      });
    await gadesContract.methods
      .getUserLevel(addr)
      .call()
      .then((result) => {
        setGadesLevel(+result + 1);
        setGadesCapacity(GadesCapacity[+result]);
      });
    if (checkStaked) await getStakedStats();
  }

  async function updateState() {
    if (await isConnected()) {
      setConnected(true);
      await getGadesStats();
    }
    getCosmicCashPrice();
  }

  useEffect(() => {
    updateState();
  });

  useEffect(() => {
    const timeDiff = 1658073600 - Math.floor(Date.now() / 1000);
    setLaunchTime(timeDiff);
    const intervalId = setInterval(() => {
      if (launchTime >= 0) {
        const timeDiff = 1658073600 - Math.floor(Date.now() / 1000);
        setLaunchTime(timeDiff);
      }
    }, 1000);
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function secondsToHms(d) {
    d = Number(d);
    const day = Math.floor(d / 86400);
    const h = Math.floor((d % 86400) / 3600);
    const m = Math.floor((d % 3600) / 60);
    const s = Math.floor((d % 3600) % 60);
    const dDisplay = day > 0 ? day + "d " : "";
    const hDisplay = h > 0 ? h + "h " : "";
    const mDisplay = m > 0 ? m + "m " : "";
    const sDisplay = s > 0 ? s + "s " : "";
    return dDisplay + hDisplay + mDisplay + sDisplay;
  }

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
                <h3 id="description">Your USD Equiv</h3>
                <h3 id="stat">
                  ${Math.floor(cscProduction * cosmicCashPrice * 100) / 100} /
                  Day
                </h3>
                <h3 id="description">Max USD Equiv</h3>
                <h3 id="stat">
                  ${Math.floor(8.8 * cosmicCashPrice * 100) / 100} / Day
                </h3>
                <h3 id="description">Capacity Level</h3>
                <h3 id="stat">{gadesLevel}</h3>
                <h3 id="description">Ready to Collect</h3>
                <h3 id="stat">
                  {ironReadyToCollect} / {gadesCapacity}
                </h3>
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
                <h3 id="description">Your USD Equiv</h3>
                <h3 id="stat">$0 / Day</h3>
                <h3 id="description">Max USD Equiv</h3>
                <h3 id="stat">$10.12 / Day</h3>
                <h3 id="description">Capacity Level</h3>
                <h3 id="stat">1</h3>
                <h3 id="description">Ready to Collect</h3>
                <h3 id="stat">0 / 2505</h3>
              </CardStats>
              <ButtonContainer>
                {connected ? (
                  // <Link to="oberon">
                  <Button disable={true}>{secondsToHms(launchTime)}</Button>
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
                <h3 id="amount">--- / Day</h3>
              </PlanetCardProductionInfo>
              <CardStats>
                <h3 id="description">Your Production</h3>
                <h3 id="stat">- Bismuth / Day</h3>
                <h3 id="description">Max Production</h3>
                <h3 id="stat">- Bismuth / Day</h3>
                <h3 id="description">Your USD Equiv</h3>
                <h3 id="stat">- / Day</h3>
                <h3 id="description">Max USD Equiv</h3>
                <h3 id="stat">- / Day</h3>
                <h3 id="description">Capacity Level</h3>
                <h3 id="stat">1</h3>
                <h3 id="description">Ready to Collect</h3>
                <h3 id="stat">0 / ---</h3>
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
