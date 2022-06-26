import { Container, Button, Line, ButtonContainer } from "../../globalStyles";
import {
  DashboardSection,
  TitleImageContainer,
  TokenInfoCard,
  TokenInfoCardImgContainer,
  TokenInfoTitleContainer,
  CardFeature,
  CardDescription,
  SmallText,
  SmallTextDollar,
  TokenInfoCardStats,
  DashboardContainer,
  ContainerFlexColumn,
  DataDiv,
} from "./DashboardStyles";

const DashboardBody = () => {
  return (
    <DashboardSection>
      <Container>
        <TitleImageContainer>
          <img src="../../assets/logo-large.png" alt="" />
        </TitleImageContainer>
      </Container>
      <DashboardContainer>
        <TokenInfoCard>
          <TokenInfoCardImgContainer>
            <img src="../../assets/gem-icon.png" alt="" />
          </TokenInfoCardImgContainer>
          <TokenInfoTitleContainer>
            <TokenInfoTitleContainer>
              <h1>GEM</h1>
              <h3>Mine Empire</h3>
            </TokenInfoTitleContainer>
            <TokenInfoTitleContainer>
              <img src="../../assets/coinmarketcap-icon.png" alt="" />
              <img src="../../assets/coingecko-icon.png" alt="" />
              <CardFeature>
                <img src="../../assets/svg/plus.svg" alt="" />
                <img src="../../assets/metamask-icon.png" alt="" />
              </CardFeature>
            </TokenInfoTitleContainer>
          </TokenInfoTitleContainer>
          <Line width="360px" />
          <CardDescription>
            <CardFeature>
              <SmallText>Price:</SmallText>
              <SmallTextDollar>$0.00</SmallTextDollar>
            </CardFeature>
            <TokenInfoCardStats>
              <h3 id="description">Circulating Supply</h3>
              <h3 id="stat">1,000</h3>
              <h3 id="description">Market Cap</h3>
              <h3 id="stat">$1,000</h3>
              <h3 id="description">Total Liquidity</h3>
              <h3 id="stat">$1,000</h3>
              <h3 id="description">Protocol Owned Liquidity</h3>
              <h3 id="stat">$1,000</h3>
            </TokenInfoCardStats>
          </CardDescription>
          <ButtonContainer>
            <Button>Buy</Button>
          </ButtonContainer>
        </TokenInfoCard>
        <TokenInfoCard>
          <TokenInfoCardImgContainer>
            <img src="../../assets/csc-icon.png" alt="" />
          </TokenInfoCardImgContainer>
          <TokenInfoTitleContainer>
            <TokenInfoTitleContainer>
              <h1>CSC</h1>
              <h3>Cosmic Cash</h3>
            </TokenInfoTitleContainer>
            <TokenInfoTitleContainer>
              <img src="../../assets/coinmarketcap-icon.png" alt="" />
              <img src="../../assets/coingecko-icon.png" alt="" />
              <CardFeature>
                <img src="../../assets/svg/plus.svg" alt="" />
                <img src="../../assets/metamask-icon.png" alt="" />
              </CardFeature>
            </TokenInfoTitleContainer>
          </TokenInfoTitleContainer>
          <Line width="360px" />
          <CardDescription>
            <CardFeature>
              <SmallText>Price:</SmallText>
              <SmallTextDollar>$0.00</SmallTextDollar>
            </CardFeature>
            <TokenInfoCardStats>
              <h3 id="description">Circulating Supply</h3>
              <h3 id="stat">1,000</h3>
              <h3 id="description">Market Cap</h3>
              <h3 id="stat">$1,000</h3>
              <h3 id="description">Total Liquidity</h3>
              <h3 id="stat">$1,000</h3>
              <h3 id="description">Protocol Owned Liquidity</h3>
              <h3 id="stat">$1,000</h3>
            </TokenInfoCardStats>
          </CardDescription>
          <ButtonContainer>
            <Button>Buy</Button>
          </ButtonContainer>
        </TokenInfoCard>

        <ContainerFlexColumn>
          <DataDiv>
            <h1>$0.00</h1>
            <h3>Total Treasury Value</h3>
          </DataDiv>
          <DataDiv>
            <h1>$0.00</h1>
            <h3>Total Income</h3>
          </DataDiv>
        </ContainerFlexColumn>
      </DashboardContainer>
    </DashboardSection>
  );
};

export default DashboardBody;
