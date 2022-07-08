import { ethers } from "ethers";
import { useEffect, useState } from "react";
import {
  BEETS_VAULT,
  converterAddress,
  cosmicCashAddress,
  TreasuryAddress,
} from "../../contracts/Addresses";
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
  const [cosmicCashPrice, setCosmicCashPrice] = useState(0);
  const [circulatingSupply, setCirculatingSupply] = useState(0);
  const [totalCosmicCashLiquidity, setTotalCosmicCashLiquidity] = useState(0);
  const [totalTreasuryValue, setTotalTreasuryValue] = useState(0);

  async function handleAddCSCToMM() {
    try {
      await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: cosmicCashAddress,
            symbol: "CSC",
            decimals: 18,
            image: "https://mineempire.io/assets/csc-256x256.png",
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function getCosmicCashPrice() {
    let totalTreasury = 0;
    let url =
      "https://api.dexscreener.com/latest/dex/tokens/" + cosmicCashAddress;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const priceUsd = data["pairs"][0]["priceUsd"];
        setCosmicCashPrice(priceUsd);
      });
    let lockedCsc = 0;
    url =
      "https://api.ftmscan.com/api?module=account&action=tokenbalance&contractaddress=" +
      cosmicCashAddress +
      "&address=" +
      converterAddress +
      "&tag=latest&apikey=SJDG322KQRHG7MHWPVY9T4EMWEW4361ZGT";
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data["result"]) {
          lockedCsc = lockedCsc + +ethers.utils.formatEther(data["result"]);
        }
      });
    url =
      "https://api.ftmscan.com/api?module=account&action=tokenbalance&contractaddress=" +
      cosmicCashAddress +
      "&address=" +
      "0x000000000000000000000000000000000000dEaD" +
      "&tag=latest&apikey=SJDG322KQRHG7MHWPVY9T4EMWEW4361ZGT";
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data["result"]) {
          lockedCsc = lockedCsc + +ethers.utils.formatEther(data["result"]);
        }
      });
    setCirculatingSupply(10000000 - lockedCsc);
    url =
      "https://api.ftmscan.com/api?module=account&action=tokenbalance&contractaddress=" +
      cosmicCashAddress +
      "&address=" +
      BEETS_VAULT +
      "&tag=latest&apikey=SJDG322KQRHG7MHWPVY9T4EMWEW4361ZGT";
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data["result"]) {
          const cscInPool = +ethers.utils.formatEther(data["result"]);
          totalTreasury = totalTreasury + cscInPool * 2;
          setTotalCosmicCashLiquidity(cscInPool * 2);
        }
      });
    url =
      "https://api.ftmscan.com/api?module=account&action=tokenbalance&contractaddress=" +
      cosmicCashAddress +
      "&address=" +
      TreasuryAddress +
      "&tag=latest&apikey=SJDG322KQRHG7MHWPVY9T4EMWEW4361ZGT";
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data["result"]) {
          const cscInTreasury = +ethers.utils.formatEther(data["result"]);
          totalTreasury = Math.floor(totalTreasury + cscInTreasury);
          setTotalTreasuryValue(totalTreasury);
        }
      });
  }

  useEffect(() => {
    getCosmicCashPrice();
    // eslint-disable-next-line
  }, []);

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
              <h3 id="stat">0</h3>
              <h3 id="description">Market Cap</h3>
              <h3 id="stat">$0</h3>
              <h3 id="description">Total Liquidity</h3>
              <h3 id="stat">$0</h3>
            </TokenInfoCardStats>
          </CardDescription>
          <ButtonContainer>
            <Button>Coming Soon</Button>
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
              <CardFeature onClick={handleAddCSCToMM}>
                <img src="../../assets/svg/plus.svg" alt="" />
                <img src="../../assets/metamask-icon.png" alt="" />
              </CardFeature>
            </TokenInfoTitleContainer>
          </TokenInfoTitleContainer>
          <Line width="360px" />
          <CardDescription>
            <CardFeature>
              <SmallText>Price:</SmallText>
              <SmallTextDollar>${cosmicCashPrice}</SmallTextDollar>
            </CardFeature>
            <TokenInfoCardStats>
              <h3 id="description">Circulating Supply</h3>
              <h3 id="stat">
                {Math.ceil(circulatingSupply).toLocaleString("en-US")}
              </h3>
              <h3 id="description">Market Cap</h3>
              <h3 id="stat">
                $
                {Math.floor(circulatingSupply * cosmicCashPrice).toLocaleString(
                  "en-US"
                )}
              </h3>
              <h3 id="description">Total Liquidity</h3>
              <h3 id="stat">
                ${Math.floor(totalCosmicCashLiquidity).toLocaleString("en-US")}
              </h3>
            </TokenInfoCardStats>
          </CardDescription>
          <ButtonContainer>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://beets.fi/#/trade?outputCurrency=0x84f8d24231dfbbfae7f39415cd09c8f467729fc8"
            >
              <Button>Get CSC</Button>
            </a>
          </ButtonContainer>
        </TokenInfoCard>

        <ContainerFlexColumn>
          <DataDiv>
            <h1>
              ${(totalTreasuryValue * cosmicCashPrice).toLocaleString("en-US")}
            </h1>
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
