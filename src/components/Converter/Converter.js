import {
  BodyContainer,
  Button,
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
} from "./ConverterStyles";

const ConverterBody = () => {
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
                <Button>Convert</Button>
              </Swap>
            </SwapContainer>
          </BodyContainer>
        </Container>
      </Section>
    </>
  );
};

export default ConverterBody;
