import {
  Container,
  TitleContainer,
  Section,
  BodyContainer,
  Button,
  Line,
  Space,
} from "../../globalStyles";
import {
  ButtonContainer,
  DescriptionContainer,
  DescriptionRow,
  PlanetBody,
  PlanetTitle,
  PlanetTitleContainer,
  StakeContainer,
  ConverterContainer,
  PlanetBodyContainer,
  ConversionBox,
} from "../Planet/PlanetStyles";

const GadesBody = () => {
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
                    <h3 id="value">#135</h3>
                  </DescriptionRow>
                  <DescriptionRow>
                    <h3 id="description">Drill Level</h3>
                    <h3 id="value">1</h3>
                  </DescriptionRow>
                  <DescriptionRow>
                    <h3 id="description">Drill Multiplier</h3>
                    <h3 id="value">x0.3</h3>
                  </DescriptionRow>
                  <DescriptionRow>
                    <h3 id="description">Collected</h3>
                    <h3 id="value">7945/7945</h3>
                  </DescriptionRow>
                  <ButtonContainer>
                    <Button>Collect</Button>
                    <Button>Unstake</Button>
                  </ButtonContainer>
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
                <ButtonContainer>
                  <Button>Upgrade</Button>
                </ButtonContainer>
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
