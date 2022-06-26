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
import { isConnected } from "../../Web3Client";
import { injected } from "../../connectors";
import { useWeb3React } from "@web3-react/core";

const CosmosBody = () => {
  const [connected, setConnected] = useState(false);
  const { activate } = useWeb3React();

  async function updateState() {
    if (await isConnected()) {
      setConnected(true);
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
                <h3 id="stat">0 Iron / Day</h3>
                <h3 id="description">Max Production</h3>
                <h3 id="stat">121,558 Iron / Day</h3>
                <h3 id="description">Your CSC Equiv</h3>
                <h3 id="stat">0 CSC / Day</h3>
                <h3 id="description">Max CSC Equiv</h3>
                <h3 id="stat">8.8 CSC / Day</h3>
                <h3 id="description">Capacity Level</h3>
                <h3 id="stat">1</h3>
                <h3 id="description">Ready to Collect</h3>
                <h3 id="stat">0 / 10,215</h3>
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
                <h3 id="amount">181 / Day</h3>
              </PlanetCardProductionInfo>
              <CardStats>
                <h3 id="description">Base ROI</h3>
                <h3 id="stat">237%</h3>
                <h3 id="description">Max ROI</h3>
                <h3 id="stat">11,532%</h3>
                <h3 id="description">Base CSC Equiv</h3>
                <h3 id="stat">1.56 CSC / Day</h3>
                <h3 id="description">Max CSC Equiv</h3>
                <h3 id="stat">75.86 CSC / Day</h3>
                <h3 id="description">Max Capacity</h3>
                <h3 id="stat">981</h3>
                <h3 id="description">Your Production</h3>
                <h3 id="stat">0 / 981</h3>
              </CardStats>
              <ButtonContainer>
                {connected ? (
                  <Link to="oberon">
                    <Button>View</Button>
                  </Link>
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
                <h3 id="amount">17 / Day</h3>
              </PlanetCardProductionInfo>
              <CardStats>
                <h3 id="description">Base ROI</h3>
                <h3 id="stat">271%</h3>
                <h3 id="description">Max ROI</h3>
                <h3 id="stat">13,188%</h3>
                <h3 id="description">Base CSC Equiv</h3>
                <h3 id="stat">1.78 CSC / Day</h3>
                <h3 id="description">Max CSC Equiv</h3>
                <h3 id="stat">86.56 CSC / Day</h3>
                <h3 id="description">Max Capacity</h3>
                <h3 id="stat">191</h3>
                <h3 id="description">Your Production</h3>
                <h3 id="stat">0 / 191</h3>
              </CardStats>
              <ButtonContainer>
                {connected ? (
                  <Link to="canopsysprime">
                    <Button>View</Button>
                  </Link>
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
