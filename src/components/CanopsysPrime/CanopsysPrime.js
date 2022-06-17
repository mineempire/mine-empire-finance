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

const CanopsysPrimeBody = () => {
  return (
    <>
      <Section>
        <Container>
          <TitleContainer>
            <h1>Canopsys Prime</h1>
          </TitleContainer>
        </Container>
        <Container>
          <BodyContainer>
            <PlanetBodyContainer>
              <PlanetBody>
                <StakeContainer>
                  <PlanetTitleContainer>
                    <img src="../../assets/canopsys.png" alt="" />
                    <PlanetTitle>
                      <h1 id="title">Canopsys</h1>
                      <h1 id="description">Planet</h1>
                    </PlanetTitle>
                  </PlanetTitleContainer>
                  <Line width="320px" />
                  <Space height="60px" />
                  <DescriptionRow>
                    <h3 id="description">Staked Drill</h3>
                    <h3 id="value">#137</h3>
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
                    <h3 id="value">17/17</h3>
                  </DescriptionRow>
                  <ButtonContainer>
                    <Button>Collect</Button>
                    <Button>Unstake</Button>
                  </ButtonContainer>
                </StakeContainer>
              </PlanetBody>
              <DescriptionContainer>
                <PlanetTitle>
                  <h1 id="title">Canopsys Prime Stats</h1>
                </PlanetTitle>
                <Line width="320px" />
                <DescriptionRow>
                  <h3 id="description">Type</h3>
                  <h3 id="value">Planet</h3>
                </DescriptionRow>
                <DescriptionRow>
                  <h3 id="description">Production Resource</h3>
                  <h3 id="value">Bismuth</h3>
                </DescriptionRow>
                <DescriptionRow>
                  <h3 id="description">Base Production</h3>
                  <h3 id="value">17 / Day</h3>
                </DescriptionRow>
                <DescriptionRow>
                  <h3 id="description">Your Production</h3>
                  <h3 id="value">17 / Day</h3>
                </DescriptionRow>
                <DescriptionRow>
                  <h3 id="description">Capacity Level</h3>
                  <h3 id="value">1 / 10</h3>
                </DescriptionRow>
                <DescriptionRow>
                  <h3 id="description">Capacity</h3>
                  <h3 id="value">107</h3>
                </DescriptionRow>
                <DescriptionRow>
                  <h3 id="description">Next Level Capacity</h3>
                  <h3 id="value">107</h3>
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
                <img src="../../assets/bismuth.png" alt="" />
                <p>1 = 0.005347594</p>
                <img src="../../assets/csc-icon.png" alt="" />
              </ConversionBox>
              <ConversionBox>
                <img src="../../assets/csc-icon.png" alt="" />
                <p>1 = 187</p>
                <img src="../../assets/bismuth.png" alt="" />
              </ConversionBox>
            </ConverterContainer>
          </BodyContainer>
        </Container>
      </Section>
    </>
  );
};

export default CanopsysPrimeBody;
