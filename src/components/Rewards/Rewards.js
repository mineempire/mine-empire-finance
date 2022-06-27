import { Button, Container, Section, TitleContainer } from "../../globalStyles";
import { GetCSCDiv } from "./RewardsStyles";
import { injected } from "../../connectors";
import { getCSCMinter } from "../../Web3Client";

const RewardsBody = () => {
  const cscMinter = getCSCMinter();

  const handleGetCSC = async () => {
    const addr = await injected.getAccount();
    await cscMinter.methods.getCSC().send({ from: addr });
  };
  return (
    <>
      <Section>
        <Container>
          <TitleContainer>
            <h1>Rewards</h1>
            <GetCSCDiv>
              <Button onClick={handleGetCSC}>Get 1000 CSC</Button>
            </GetCSCDiv>
          </TitleContainer>
        </Container>
      </Section>
    </>
  );
};

export default RewardsBody;
