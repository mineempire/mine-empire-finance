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

const OberonBody = () => {
  return (
    <>
      <Section>
        <Container>
          <TitleContainer>
            <h1>Oberon</h1>
          </TitleContainer>
        </Container>
        <Container>
          <BodyContainer>
            <PlanetBodyContainer>
              <PlanetBody>
                <StakeContainer>
                  <PlanetTitleContainer>
                    <img src="../../assets/oberon.png" alt="" />
                    <PlanetTitle>
                      <h1 id="title">Oberon</h1>
                      <h1 id="description">Asteroid</h1>
                    </PlanetTitle>
                  </PlanetTitleContainer>
                  <Line width="320px" />
                  <Space height="60px" />
                  <DescriptionRow>
                    <h3 id="description">Staked Drill</h3>
                    <h3 id="value">#136</h3>
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
                    <h3 id="value">1836/1836</h3>
                  </DescriptionRow>
                  <ButtonContainer>
                    <Button>Collect</Button>
                    <Button>Unstake</Button>
                  </ButtonContainer>
                </StakeContainer>
              </PlanetBody>
              <DescriptionContainer>
                <PlanetTitle>
                  <h1 id="title">Oberon Stats</h1>
                </PlanetTitle>
                <Line width="320px" />
                <DescriptionRow>
                  <h3 id="description">Type</h3>
                  <h3 id="value">Asteroid</h3>
                </DescriptionRow>
                <DescriptionRow>
                  <h3 id="description">Production Resource</h3>
                  <h3 id="value">Cobalt</h3>
                </DescriptionRow>
                <DescriptionRow>
                  <h3 id="description">Base Production</h3>
                  <h3 id="value">386 / Day</h3>
                </DescriptionRow>
                <DescriptionRow>
                  <h3 id="description">Your Production</h3>
                  <h3 id="value">386 / Day</h3>
                </DescriptionRow>
                <DescriptionRow>
                  <h3 id="description">Capacity Level</h3>
                  <h3 id="value">1 / 10</h3>
                </DescriptionRow>
                <DescriptionRow>
                  <h3 id="description">Capacity</h3>
                  <h3 id="value">1,985</h3>
                </DescriptionRow>
                <DescriptionRow>
                  <h3 id="description">Next Level Capacity</h3>
                  <h3 id="value">1,985</h3>
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
                <img src="../../assets/cobalt.png" alt="" />
                <p>1 = 0.0002042484</p>
                <img src="../../assets/csc-icon.png" alt="" />
              </ConversionBox>
              <ConversionBox>
                <img src="../../assets/csc-icon.png" alt="" />
                <p>1 = 4896</p>
                <img src="../../assets/cobalt.png" alt="" />
              </ConversionBox>
            </ConverterContainer>
          </BodyContainer>
        </Container>
      </Section>
    </>
  );
};

export default OberonBody;
