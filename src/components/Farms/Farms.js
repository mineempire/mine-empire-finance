import { ethers } from "ethers";
import {
  BasicButton,
  ButtonContainer,
  Container,
  Line,
  Section,
  TitleContainer,
} from "../../globalStyles";
import {
  FarmBodyContainer,
  FarmBodyRow,
  FarmBodyRowRewardTokenContainer,
  FarmContainer,
  FarmExchangeAndNetworkContainer,
  FarmHeaderContainer,
  FarmsContainer,
} from "./FarmsStyles";

const FarmsBody = () => {
  const ftmProvider = new ethers.providers.JsonRpcProvider(
    process.env.FANTOM_PROVIDER
  );
  ftmProvider.send("");
  return (
    <>
      <Section>
        <Container>
          <TitleContainer>
            <h1>Mine Empire Farms & Vaults</h1>
          </TitleContainer>
          <FarmsContainer>
            <FarmContainer border="#13b5ec">
              <FarmHeaderContainer>
                <h1>GEM/FTM/USDC</h1>
                <FarmExchangeAndNetworkContainer>
                  <img src="../../assets/exchanges/beets.png" />
                  <img src="../../assets/networks/fantom.png" />
                </FarmExchangeAndNetworkContainer>
              </FarmHeaderContainer>
              <Line width="316px" />
              <FarmBodyContainer>
                <FarmBodyRow>
                  <h3>TVL</h3>
                  <h3>$81,332</h3>
                </FarmBodyRow>
                <FarmBodyRow>
                  <h3>Type</h3>
                  <h3>Farm</h3>
                </FarmBodyRow>
                <FarmBodyRow>
                  <h3>APR</h3>
                  <h3>59%</h3>
                </FarmBodyRow>
                <FarmBodyRow>
                  <h3>Reward Token</h3>
                  <FarmBodyRowRewardTokenContainer>
                    <img src="../../assets/exchanges/beets.png" />
                  </FarmBodyRowRewardTokenContainer>
                </FarmBodyRow>
                <FarmBodyRow>
                  <h3>Your LP</h3>
                  <h3>$0</h3>
                </FarmBodyRow>
                <FarmBodyRow>
                  <h3>Rewards</h3>
                  <h3>$0</h3>
                </FarmBodyRow>
              </FarmBodyContainer>
              <Line width="316px" />
              <FarmBodyContainer>
                <BasicButton>View</BasicButton>
              </FarmBodyContainer>
            </FarmContainer>
            <FarmContainer border="#13b5ec">
              <FarmHeaderContainer>
                <h1>GEM/FTM/USDC</h1>
                <FarmExchangeAndNetworkContainer>
                  <img src="../../assets/exchanges/comb.png" />
                  <img src="../../assets/networks/fantom.png" />
                </FarmExchangeAndNetworkContainer>
              </FarmHeaderContainer>
              <Line width="316px" />
              <FarmBodyContainer>
                <FarmBodyRow>
                  <h3>TVL</h3>
                  <h3>$32,336</h3>
                </FarmBodyRow>
                <FarmBodyRow>
                  <h3>Type</h3>
                  <h3>Vault</h3>
                </FarmBodyRow>
                <FarmBodyRow>
                  <h3>APY</h3>
                  <h3>124%</h3>
                </FarmBodyRow>
                <FarmBodyRow>
                  <h3>Reward Token</h3>
                  <FarmBodyRowRewardTokenContainer>
                    <img src="../../assets/exchanges/beets.png" />
                  </FarmBodyRowRewardTokenContainer>
                </FarmBodyRow>
                <FarmBodyRow>
                  <h3>Your LP</h3>
                  <h3>$0</h3>
                </FarmBodyRow>
                <FarmBodyRow>
                  <h3>Rewards</h3>
                  <h3>$0</h3>
                </FarmBodyRow>
              </FarmBodyContainer>
              <Line width="316px" />
              <FarmBodyContainer>
                <BasicButton>View</BasicButton>
              </FarmBodyContainer>
            </FarmContainer>
            <FarmContainer border="#8247E5">
              <FarmHeaderContainer>
                <h1>GEM/USD</h1>
                <FarmExchangeAndNetworkContainer>
                  <img src="../../assets/exchanges/penrose.svg" />
                  <img src="../../assets/networks/polygon.png" />
                </FarmExchangeAndNetworkContainer>
              </FarmHeaderContainer>
              <Line width="316px" />
              <FarmBodyContainer>
                <FarmBodyRow>
                  <h3>TVL</h3>
                  <h3>$0</h3>
                </FarmBodyRow>
                <FarmBodyRow>
                  <h3>Type</h3>
                  <h3>Farm</h3>
                </FarmBodyRow>
                <FarmBodyRow>
                  <h3>APY</h3>
                  <h3>0%</h3>
                </FarmBodyRow>
                <FarmBodyRow>
                  <h3>Reward Tokens</h3>
                  <FarmBodyRowRewardTokenContainer>
                    <img src="../../assets/exchanges/dystopia.png" />
                    <img src="../../assets/exchanges/penrose.svg" />
                  </FarmBodyRowRewardTokenContainer>
                </FarmBodyRow>
                <FarmBodyRow>
                  <h3>Your LP</h3>
                  <h3>$0</h3>
                </FarmBodyRow>
                <FarmBodyRow>
                  <h3>Rewards</h3>
                  <h3>$0</h3>
                </FarmBodyRow>
              </FarmBodyContainer>
              <Line width="316px" />
              <FarmBodyContainer>
                <BasicButton>View</BasicButton>
              </FarmBodyContainer>
            </FarmContainer>
          </FarmsContainer>
        </Container>
      </Section>
    </>
  );
};

export default FarmsBody;
