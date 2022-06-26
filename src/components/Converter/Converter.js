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
  SelectResourceModalBg,
  SelectResourceModal,
  SelectResourceMenuTitle,
  SelectResourceMenu,
  SelectResourceMenuBody,
  SelectResourceMenuItem,
  SelectResourceNameImg,
} from "./ConverterStyles";
import { useEffect, useState } from "react";
import {
  getConverterContract,
  getIronContract,
  isConnected,
} from "../../Web3Client";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../../connectors";
import { ethers } from "ethers";
import { converterAddress, ironAddress } from "../../contracts/Addresses";

const ConverterBody = () => {
  const [connected, setConnected] = useState(true);
  const [showSelect, setShowSelect] = useState(false);
  const [selectedResource, setSelectedResource] = useState("iron");
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const [inputQuantity] = useState();
  const [ouputQuantity, setOutputQuantity] = useState(0);
  const [ironQuantity, setIronQuantity] = useState(0);
  const [conversionRate, setConversionRate] = useState(13809);
  const [cobaltQuantity] = useState(0);
  const [silverQuantity] = useState(0);
  const [bismuthQuantity] = useState(0);
  const [rubyQuantity] = useState(0);
  const [approvedIron, setApprovedIron] = useState(false);
  const { activate } = useWeb3React();

  const ironContract = getIronContract();
  const converterContract = getConverterContract();

  async function checkConnection() {
    const connected = await isConnected();
    setConnected(connected);
  }

  async function getApproved() {
    const addr = await injected.getAccount();
    await ironContract.methods
      .allowance(addr, converterAddress)
      .call()
      .then((result) => {
        const amount = ethers.utils.formatEther(result);
        if (+amount < 10000000) {
          setApprovedIron(false);
        } else {
          setApprovedIron(true);
        }
      });
  }

  async function getBalances() {
    const addr = await injected.getAccount();
    await ironContract.methods
      .balanceOf(addr)
      .call()
      .then((result) => {
        const amt = Math.floor(+ethers.utils.formatEther(result));
        setIronQuantity(amt);
        setSelectedQuantity(amt);
      });
    getApproved();
  }

  useEffect(() => {
    checkConnection();
    getBalances();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectResourceMenu = () => {
    setShowSelect(!showSelect);
  };

  const handleDisableSelect = () => {
    setShowSelect(false);
  };

  async function handleSelectResource(id) {
    if (id === 0) {
      setSelectedResource("iron");
      setSelectedQuantity(ironQuantity);
      setConversionRate(13809);
    } else if (id === 1) {
      setSelectedResource("cobalt");
      setSelectedQuantity(cobaltQuantity);
    } else if (id === 2) {
      setSelectedResource("silver");
      setSelectedQuantity(silverQuantity);
    } else if (id === 3) {
      setSelectedResource("bismuth");
      setSelectedQuantity(bismuthQuantity);
    } else if (id === 4) {
      setSelectedResource("ruby");
      setSelectedQuantity(rubyQuantity);
    }
  }

  async function handleSetMaxAmount() {}

  async function handleInputOnChange(event) {
    const amt = event.target.value;
    const outputAmount = amt / conversionRate;
    setOutputQuantity(outputAmount);
  }

  async function handleApprove() {
    const addr = await injected.getAccount();
    await ironContract.methods
      .approve(converterAddress, "1000000000000000000000000000")
      .send({ from: addr })
      .then()
      .catch((err) => console.log(err));
    getApproved();
  }

  async function handleConvert() {
    if (selectedResource !== "iron") return;
    const addr = await injected.getAccount();
    await converterContract.methods
      .convert(ironAddress, inputQuantity + "000000000000000000")
      .send({ from: addr })
      .then()
      .catch((err) => console.log(err));
    getBalances();
  }

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
            <SelectResourceModalBg
              showSelect={showSelect}
              onClick={handleDisableSelect}
            >
              <SelectResourceModal>
                <SelectResourceMenu>
                  <SelectResourceMenuTitle>
                    <h3>Select a Resource</h3>
                  </SelectResourceMenuTitle>
                  <SelectResourceMenuBody>
                    <SelectResourceMenuItem
                      onClick={() => handleSelectResource(0)}
                    >
                      <SelectResourceNameImg>
                        <img src="../../assets/iron.png" alt="" />
                        <p id="name">Iron</p>
                      </SelectResourceNameImg>
                      <p id="qt">{ironQuantity}</p>
                    </SelectResourceMenuItem>
                    <SelectResourceMenuItem
                      onClick={() => handleSelectResource(1)}
                    >
                      <SelectResourceNameImg>
                        <img src="../../assets/cobalt.png" alt="" />
                        <p id="name">Cobalt</p>
                      </SelectResourceNameImg>
                      <p id="qt">{cobaltQuantity}</p>
                    </SelectResourceMenuItem>
                    <SelectResourceMenuItem
                      onClick={() => handleSelectResource(2)}
                    >
                      <SelectResourceNameImg>
                        <img src="../../assets/silver.png" alt="" />
                        <p id="name">Silver</p>
                      </SelectResourceNameImg>
                      <p id="qt">{silverQuantity}</p>
                    </SelectResourceMenuItem>
                    <SelectResourceMenuItem
                      onClick={() => handleSelectResource(3)}
                    >
                      <SelectResourceNameImg>
                        <img src="../../assets/bismuth.png" alt="" />
                        <p id="name">Bismuth</p>
                      </SelectResourceNameImg>
                      <p id="qt">{bismuthQuantity}</p>
                    </SelectResourceMenuItem>
                    <SelectResourceMenuItem
                      onClick={() => handleSelectResource(4)}
                    >
                      <SelectResourceNameImg>
                        <img src="../../assets/ruby.png" alt="" />
                        <p id="name">Ruby</p>
                      </SelectResourceNameImg>
                      <p id="qt">{rubyQuantity}</p>
                    </SelectResourceMenuItem>
                  </SelectResourceMenuBody>
                </SelectResourceMenu>
              </SelectResourceModal>
            </SelectResourceModalBg>
            <SwapContainer>
              <Swap>
                <SwapTitleContainer>
                  <p>Convert</p>
                </SwapTitleContainer>
                <ResourceBox>
                  <TokenMain>
                    <TokenImgContainer onClick={handleSelectResourceMenu}>
                      <img
                        src={"../../assets/" + selectedResource + ".png"}
                        alt=""
                      />
                    </TokenImgContainer>
                    <TokenAmountContainer>
                      <TokenAmountText>
                        <input
                          type="number"
                          onChange={(val) => handleInputOnChange(val)}
                        />
                      </TokenAmountText>
                    </TokenAmountContainer>
                  </TokenMain>
                  <TokenBalanceContainer onClick={handleSetMaxAmount}>
                    <p>
                      {selectedResource}: {selectedQuantity}
                    </p>
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
                        <input type="number" readOnly value={ouputQuantity} />
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
                      approvedIron ? (
                        <Button onClick={handleConvert}>
                          Convert {selectedResource}
                        </Button>
                      ) : (
                        <Button onClick={handleApprove}>
                          Approve {selectedResource}
                        </Button>
                      )
                    ) : (
                      <Button onClick={() => activate(injected)}>
                        Connect
                      </Button>
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
