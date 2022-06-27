import { Button, Container, Section, TitleContainer } from "../../globalStyles";
import { GetCSCDiv } from "./RewardsStyles";

const RewardsBody = () => {
  return (
    <>
      <Section>
        <Container>
          <TitleContainer>
            <h1>Rewards</h1>
            <GetCSCDiv>
              <Button>Get 1000 CSC</Button>
            </GetCSCDiv>
          </TitleContainer>
        </Container>
      </Section>
    </>
  );
};

export default RewardsBody;
