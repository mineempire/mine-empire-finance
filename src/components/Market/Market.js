import {
  BodyContainer,
  Container,
  TitleContainer,
  Section,
} from "../../globalStyles";

import { Button, CardButtonContainer } from "../../globalStyles";

import {
  NFTCard,
  NFTCardHeader,
  NFTCardStats,
  MintAmount,
} from "./MarketStyles";

const MarketBody = () => {
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
              <img src="../../assets/svg/line400px.svg" alt="" />
              <NFTCardStats>
                <h3 id="description">Price</h3>
                <h3 id="stat">100 FTM</h3>
                <h3 id="description">Speciality</h3>
                <h3 id="stat">Asteroid</h3>
                <h3 id="description">Level / Max</h3>
                <h3 id="stat">1 / 20</h3>
                <h3 id="description">Power / Max</h3>
                <h3 id="stat">1.00 / 48.63</h3>
              </NFTCardStats>
              <MintAmount>
                <h1>56/100</h1>
                <CardButtonContainer>
                  <Button>Mint</Button>
                </CardButtonContainer>
              </MintAmount>
            </NFTCard>
          </BodyContainer>
        </Container>
      </Section>
    </>
  );
};

export default MarketBody;
