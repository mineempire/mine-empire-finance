import { ethers } from "ethers";
import { useEffect, useState } from "react";
import {
  BEETS_VAULT,
  cosmicCashAddress,
  FTMScanAPI1,
  FTMScanAPI2,
  FTMScanAPI3,
  GemBeetsVault,
  MineEmpireAddress,
  MineEmpireVestingWallet,
  TreasuryAddress,
} from "../../contracts/Addresses";
import { Container, TitleContainer, BasicButton } from "../../globalStyles";
import { sleep } from "../../Web3Client";
import {
  DashboardSection,
  DashboardContainer,
  TokenInfoCardContainer,
  DataDiv,
  DataDivTitle,
  TokenInfoCardContainerFooter,
} from "./DashboardStyles";

const DashboardBody = () => {
  const [cosmicCashPrice, setCosmicCashPrice] = useState(0);
  const [totalCosmicCashLiquidity, setTotalCosmicCashLiquidity] = useState(0);
  const [gemPrice, setGemPrice] = useState(0);
  const [gemCirculatingSupply, setGemCirculatingSupply] = useState(0);
  const [totalGemLiquidity, setTotalGemLiquidity] = useState(0);
  const [cscInWallet, setCscInWallet] = useState(0);
  const [gemInWallet, setGemInWallet] = useState(0);
  const [beetsPrice, setBeetsPrice] = useState(0);

  async function getBeetsPrice() {
    let priceUsd = 0;
    const beetsAddr = "0xF24Bcf4d1e507740041C9cFd2DddB29585aDCe1e";
    let url = "https://api.dexscreener.com/latest/dex/tokens/" + beetsAddr;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        priceUsd = data["pairs"][0]["priceUsd"];
        setBeetsPrice(priceUsd);
      });
  }

  async function getCosmicCashPrice() {
    let priceUsd = 0;
    let url =
      "https://api.dexscreener.com/latest/dex/tokens/" + cosmicCashAddress;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        priceUsd = data["pairs"][0]["priceUsd"];
        setCosmicCashPrice(priceUsd);
      });
    url =
      "https://api.ftmscan.com/api?module=account&action=tokenbalance&contractaddress=" +
      cosmicCashAddress +
      "&address=" +
      BEETS_VAULT +
      "&tag=latest&apikey=" +
      FTMScanAPI3;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data["result"]) {
          const cscInPool = +ethers.utils.formatEther(data["result"]);
          setTotalCosmicCashLiquidity(cscInPool * 2 * priceUsd);
        }
      });
  }

  async function getGemPrice() {
    let lockedGem = 0;
    let priceUsd = 0;
    let url =
      "https://api.dexscreener.com/latest/dex/tokens/" + MineEmpireAddress;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        priceUsd = data["pairs"][0]["priceUsd"];
        setGemPrice(priceUsd);
      });
    url =
      "https://api.ftmscan.com/api?module=account&action=tokenbalance&contractaddress=" +
      MineEmpireAddress +
      "&address=" +
      MineEmpireVestingWallet +
      "&tag=latest&apikey=" +
      FTMScanAPI1;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (!isNaN(data["result"])) {
          lockedGem = lockedGem + +ethers.utils.formatEther(data["result"]);
        }
      });
    setGemCirculatingSupply(10000 - lockedGem);
    url =
      "https://api.ftmscan.com/api?module=account&action=tokenbalance&contractaddress=" +
      MineEmpireAddress +
      "&address=" +
      GemBeetsVault +
      "&tag=latest&apikey=" +
      FTMScanAPI2;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data["result"]) {
          const gemInPool = +ethers.utils.formatEther(data["result"]);
          setTotalGemLiquidity(gemInPool * priceUsd * 1.25);
        }
      });
  }

  async function getTreasuryValue() {
    let cscInWallet = 0;
    let gemInWallet = 0;
    let url =
      "https://api.ftmscan.com/api?module=account&action=tokenbalance&contractaddress=" +
      cosmicCashAddress +
      "&address=" +
      TreasuryAddress +
      "&tag=latest&apikey=" +
      FTMScanAPI2;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (!isNaN(data["result"])) {
          cscInWallet = +ethers.utils.formatEther(data["result"]);
        }
      });
    url =
      "https://api.ftmscan.com/api?module=account&action=tokenbalance&contractaddress=" +
      MineEmpireAddress +
      "&address=" +
      TreasuryAddress +
      "&tag=latest&apikey=" +
      FTMScanAPI3;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (!isNaN(data["result"])) {
          gemInWallet = +ethers.utils.formatEther(data["result"]);
        }
      });
    setCscInWallet(cscInWallet);
    setGemInWallet(gemInWallet);
  }

  async function updateState() {
    await getCosmicCashPrice();
    await sleep(500);
    await getGemPrice();
    await sleep(500);
    await getTreasuryValue();
    await sleep(500);
    await getBeetsPrice();
  }

  useEffect(() => {
    updateState();
    const intervalId = setInterval(() => {
      updateState();
    }, 10000);
    return () => clearInterval(intervalId);
    // eslint-disable-next-line
  }, []);

  return (
    <DashboardSection>
      <Container>
        <TitleContainer>
          <h1>Mine Empire Finance</h1>
          <h3>Bribe, Buyback, repeat.</h3>
        </TitleContainer>
      </Container>
      <DashboardContainer>
        <TokenInfoCardContainer>
          <DataDiv>
            <h1>${gemPrice.toLocaleString("en-US")}</h1>
            <DataDivTitle>
              <h3>GEM price</h3>
              <img src="../../assets/exchanges/beets.png" alt="" />
              <img src="../../assets/networks/fantom.png" alt="" />
            </DataDivTitle>
          </DataDiv>
          <DataDiv>
            <h1>
              $
              {(Math.ceil(1153 * beetsPrice * 100) / 100).toLocaleString(
                "en-US"
              )}
            </h1>
            <DataDivTitle>
              <h3>GEM Daily Buyback</h3>
            </DataDivTitle>
          </DataDiv>
        </TokenInfoCardContainer>
        <TokenInfoCardContainer>
          <DataDiv>
            <h1 id="stat">
              {Math.ceil(gemCirculatingSupply).toLocaleString("en-US")}
            </h1>
            <h3 id="description">GEM Circulating Supply</h3>
          </DataDiv>
          <DataDiv>
            <h1 id="stat">
              $
              {Math.floor(gemCirculatingSupply * gemPrice).toLocaleString(
                "en-US"
              )}
            </h1>
            <h3 id="description">Market Cap</h3>
          </DataDiv>
        </TokenInfoCardContainer>
        <TokenInfoCardContainer>
          <DataDiv>
            <h1>
              $
              {Math.ceil(
                cscInWallet * cosmicCashPrice +
                  gemInWallet * gemPrice +
                  totalCosmicCashLiquidity +
                  totalGemLiquidity
              ).toLocaleString("en-US")}
            </h1>
            <h3>Total Treasury Value</h3>
          </DataDiv>
          <DataDiv>
            <h1>
              $
              {Math.ceil(
                gemInWallet * gemPrice +
                  totalCosmicCashLiquidity +
                  totalGemLiquidity
              ).toLocaleString("en-US")}
            </h1>
            <h3>Total Protocol Owned Liquidity</h3>
          </DataDiv>
        </TokenInfoCardContainer>
        <TokenInfoCardContainerFooter>
          <BasicButton>Trade On Fantom</BasicButton>
        </TokenInfoCardContainerFooter>
      </DashboardContainer>
    </DashboardSection>
  );
};

export default DashboardBody;
