import {
  BodyContainer,
  Container,
  TitleContainer,
  Section,
} from "../../globalStyles";

import {
  PlanetCard,
  PlanetCardImgContainer,
  PlanetCardTitleContainer,
  PlanetCardProductionInfo,
  CardStats,
} from "./CosmosStyles";

import { Button, CardButtonContainer, PageContainer } from "../../globalStyles";

const CosmosBody = () => {
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
              <img src="../../assets/svg/line360px.svg" alt="" />
              <PlanetCardProductionInfo>
                <img src="../../assets/iron60px.png" alt="" />
                <h3 id="production">Production:</h3>
                <h3 id="amount">1,135 / Day</h3>
              </PlanetCardProductionInfo>
              <CardStats>
                <h3 id="description">Base APR</h3>
                <h3 id="stat">200%</h3>
                <h3 id="description">Max APR</h3>
                <h3 id="stat">9,726%</h3>
                <h3 id="description">Base CSC Equiv</h3>
                <h3 id="stat">1.32 CSC / Day</h3>
                <h3 id="description">Max CSC Equiv</h3>
                <h3 id="stat">64.19 CSC / Day</h3>
                <h3 id="description">Max Capacity</h3>
                <h3 id="stat">33,193</h3>
                <h3 id="description">Your Production</h3>
                <h3 id="stat">0 / 33,193</h3>
              </CardStats>
              <CardButtonContainer>
                <Button>View</Button>
              </CardButtonContainer>
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
              <img src="../../assets/svg/line360px.svg" alt="" />
              <PlanetCardProductionInfo>
                <img src="../../assets/cobalt.png" alt="" />
                <h3 id="production">Production:</h3>
                <h3 id="amount">181 / Day</h3>
              </PlanetCardProductionInfo>
              <CardStats>
                <h3 id="description">Base APR</h3>
                <h3 id="stat">237%</h3>
                <h3 id="description">Max APR</h3>
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
              <CardButtonContainer>
                <Button>View</Button>
              </CardButtonContainer>
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
              <img src="../../assets/svg/line360px.svg" alt="" />
              <PlanetCardProductionInfo>
                <img src="../../assets/bismuth.png" alt="" />
                <h3 id="production">Production:</h3>
                <h3 id="amount">17 / Day</h3>
              </PlanetCardProductionInfo>
              <CardStats>
                <h3 id="description">Base APR</h3>
                <h3 id="stat">271%</h3>
                <h3 id="description">Max APR</h3>
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
              <CardButtonContainer>
                <Button>View</Button>
              </CardButtonContainer>
            </PlanetCard>
          </BodyContainer>
        </Container>
      </Section>
    </>
  );
};

export default CosmosBody;
