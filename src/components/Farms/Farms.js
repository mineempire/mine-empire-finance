import { useEffect, useState } from "react";
import {
  BasicButton,
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
  const [combAPY, setCombAPY] = useState(0);
  const [combTVL, setCombTVL] = useState(0);
  const [beetsAPR, setBeetsAPR] = useState(0);
  const [beetsTVL, setBeetsTVL] = useState(0);
  async function getCombFarm() {
    const combVaultsUrl = "https://comb-breakdown.herokuapp.com/vaults";
    await fetch(combVaultsUrl)
      .then((response) => response.json())
      .then((data) => {
        for (let i = 0; i < data.length; i++) {
          if (data[i]["vaultId"] === "gemFtmUsdc") {
            setCombAPY(data[i]["apy"]);
            setCombTVL(data[i]["tvl"]);
          }
        }
      });
  }

  async function getBeetsFarm() {
    const beetsGraphQl = "https://backend-v2.beets-ftm-node.com/graphql";
    const query = `query {
        poolGetPool(
          id: "0xa8eeb38ebfa215d4d3c7499532d5066b8bc6ed450001000000000000000004f6"
        ) {
          dynamicData {
            apr {
              total
            }
            fees24h
            holdersCount
            totalLiquidity
            volume24h
          }
        }
      }
    `;
    const res = await fetch(beetsGraphQl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: query,
      }),
    }).catch((reason) => {
      console.log("error fetching beets ql");
      console.log(JSON.stringify(reason));
    });
    const json = await res.json().catch((reason) => {
      console.log("failed to JSON serialize");
      console.log(reason);
    });
    console.log(json["data"]["poolGetPool"]["dynamicData"]);
    setBeetsAPR(+json["data"]["poolGetPool"]["dynamicData"]["apr"]["total"]);
    setBeetsTVL(+json["data"]["poolGetPool"]["dynamicData"]["totalLiquidity"]);
  }

  async function updateFarms() {
    await getCombFarm();
    await getBeetsFarm();
  }

  useEffect(() => {
    updateFarms();
    // eslint-disable-next-line
  }, []);

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
                  <img src="../../assets/exchanges/beets.png" alt="" />
                  <img src="../../assets/networks/fantom.png" alt="" />
                </FarmExchangeAndNetworkContainer>
              </FarmHeaderContainer>
              <Line width="316px" />
              <FarmBodyContainer>
                <FarmBodyRow>
                  <h3>TVL</h3>
                  <h3>${Math.ceil(beetsTVL).toLocaleString("en-US")}</h3>
                </FarmBodyRow>
                <FarmBodyRow>
                  <h3>Type</h3>
                  <h3>Farm</h3>
                </FarmBodyRow>
                <FarmBodyRow>
                  <h3>APR</h3>
                  <h3>{Math.ceil(beetsAPR * 100).toLocaleString("en-US")}%</h3>
                </FarmBodyRow>
                <FarmBodyRow>
                  <h3>Reward Token</h3>
                  <FarmBodyRowRewardTokenContainer>
                    <img src="../../assets/exchanges/beets.png" alt="" />
                  </FarmBodyRowRewardTokenContainer>
                </FarmBodyRow>
                {/* <FarmBodyRow>
                  <h3>Your LP</h3>
                  <h3>$0</h3>
                </FarmBodyRow>
                <FarmBodyRow>
                  <h3>Rewards</h3>
                  <h3>$0</h3>
                </FarmBodyRow> */}
              </FarmBodyContainer>
              <Line width="316px" />
              <FarmBodyContainer>
                <a
                  href="https://beets.fi/#/pool/0xa8eeb38ebfa215d4d3c7499532d5066b8bc6ed450001000000000000000004f6"
                  target="_blank"
                  rel="noreferrer"
                >
                  <BasicButton>View</BasicButton>
                </a>
              </FarmBodyContainer>
            </FarmContainer>
            <FarmContainer border="#13b5ec">
              <FarmHeaderContainer>
                <h1>GEM/FTM/USDC</h1>
                <FarmExchangeAndNetworkContainer>
                  <img src="../../assets/exchanges/comb.png" alt="" />
                  <img src="../../assets/networks/fantom.png" alt="" />
                </FarmExchangeAndNetworkContainer>
              </FarmHeaderContainer>
              <Line width="316px" />
              <FarmBodyContainer>
                <FarmBodyRow>
                  <h3>TVL</h3>
                  <h3>${Math.ceil(combTVL).toLocaleString("en-US")}</h3>
                </FarmBodyRow>
                <FarmBodyRow>
                  <h3>Type</h3>
                  <h3>Vault</h3>
                </FarmBodyRow>
                <FarmBodyRow>
                  <h3>APY</h3>
                  <h3>{Math.ceil(combAPY * 100).toLocaleString("en-US")}%</h3>
                </FarmBodyRow>
                <FarmBodyRow>
                  <h3>Reward Token</h3>
                  <FarmBodyRowRewardTokenContainer>
                    <img src="../../assets/exchanges/beets.png" alt="" />
                  </FarmBodyRowRewardTokenContainer>
                </FarmBodyRow>
                {/* <FarmBodyRow>
                  <h3>Your LP</h3>
                  <h3>$0</h3>
                </FarmBodyRow>
                <FarmBodyRow>
                  <h3>Rewards</h3>
                  <h3>$0</h3>
                </FarmBodyRow> */}
              </FarmBodyContainer>
              <Line width="316px" />
              <FarmBodyContainer>
                <a
                  href="https://app.comb.financial/yield-optimizer"
                  target="_blank"
                  rel="noreferrer"
                >
                  <BasicButton>View</BasicButton>
                </a>
              </FarmBodyContainer>
            </FarmContainer>
            <FarmContainer border="#8247E5">
              <FarmHeaderContainer>
                <h1>GEM/USDC (Soon™)</h1>
                <FarmExchangeAndNetworkContainer>
                  <img src="../../assets/exchanges/penrose.svg" alt="" />
                  <img src="../../assets/networks/polygon.png" alt="" />
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
                  <h3>APR</h3>
                  <h3>0%</h3>
                </FarmBodyRow>
                <FarmBodyRow>
                  <h3>Reward Tokens</h3>
                  <FarmBodyRowRewardTokenContainer>
                    <img src="../../assets/exchanges/dystopia.png" alt="" />
                    <img src="../../assets/exchanges/penrose.svg" alt="" />
                  </FarmBodyRowRewardTokenContainer>
                </FarmBodyRow>
                {/* <FarmBodyRow>
                  <h3>Your LP</h3>
                  <h3>$0</h3>
                </FarmBodyRow>
                <FarmBodyRow>
                  <h3>Rewards</h3>
                  <h3>$0</h3>
                </FarmBodyRow> */}
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
