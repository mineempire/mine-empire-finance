import {
  BodyContainer,
  Button,
  ButtonContainer,
  Container,
  Section,
  TitleContainer,
} from "../../globalStyles";
import { AiOutlineArrowDown } from "react-icons/ai";

import {
  SwapContainer,
  Swap,
  ResourceBox,
  TokenImgContainer,
  TokenAmountContainer,
  TokenBalanceContainer,
  TokenMain,
  TokenAmountText,
  Arrow,
  ArrowContainer,
  SwapTitleContainer,
  ConvertButtonContainer,
} from "./ConverterStyles";
import { useEffect, useState } from "react";
import { isConnected } from "../../Web3Client";

const ConverterBody = () => {
  const [connected, setConnected] = useState(true);

  useEffect(() => {
    async function checkConnection() {
      const connected = await isConnected();
      setConnected(connected);
    }
    checkConnection();
  }, []);

  const handleConnect = async () => {};

  return (
    <>
      <Section>
        <Container>
          <TitleContainer>
            <h1>Convert to Cosmic Cash</h1>
            <h3>All resources can be converted to Cosmic Cash.</h3>
          </TitleContainer>
        </Container>
        <Container>
          <BodyContainer>
            <SwapContainer>
              <Swap>
                <SwapTitleContainer>
                  <p>Convert</p>
                </SwapTitleContainer>
                <ResourceBox>
                  <TokenMain>
                    <TokenImgContainer>
                      <img src="../../assets/iron60px.png" alt="" />
                    </TokenImgContainer>
                    <TokenAmountContainer>
                      <TokenAmountText>
                        <input type="text" />
                      </TokenAmountText>
                    </TokenAmountContainer>
                  </TokenMain>
                  <TokenBalanceContainer>
                    <p>Iron: 0</p>
                  </TokenBalanceContainer>
                </ResourceBox>
                <ArrowContainer>
                  <Arrow>
                    <AiOutlineArrowDown />
                  </Arrow>
                </ArrowContainer>
                <ResourceBox>
                  <TokenMain>
                    <TokenImgContainer>
                      <img src="../../assets/csc-icon.png" alt="" />
                    </TokenImgContainer>
                    <TokenAmountContainer>
                      <TokenAmountText>
                        <input type="text" />
                      </TokenAmountText>
                    </TokenAmountContainer>
                  </TokenMain>
                  <TokenBalanceContainer>
                    <p>Cosmic Cash: 0</p>
                  </TokenBalanceContainer>
                </ResourceBox>
                <ConvertButtonContainer>
                  <ButtonContainer>
                    {connected ? (
                      <Button>Convert</Button>
                    ) : (
                      <Button onClick={handleConnect}>Connect</Button>
                    )}
                  </ButtonContainer>
                </ConvertButtonContainer>
              </Swap>
            </SwapContainer>
          </BodyContainer>
        </Container>
      </Section>
    </>
  );
};

export default ConverterBody;
