import styled from "styled-components";

export const SwapContainer = styled.div`
  display: flex;
`;

export const Swap = styled.div`
  display: flex;
  width: 320px;
  border-radius: 15px;
  background-color: #312525;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 10px;
`;

export const SwapTitleContainer = styled.div`
  display: flex;
  margin: 10px;
  p {
    color: #fff;
    font-weight: 600;
  }
`;

export const ArrowContainer = styled.div`
  display: flex;
  justify-content: center;
  color: #fff;
  font-size: 1.5rem;
  margin: -10px 0;
`;

export const Arrow = styled.div`
  display: flex;
`;

export const ResourceBox = styled.div`
  display: flex;
  position: relative;
  border-radius: 15px;
  background-color: #463d3d;
  justify-content: space-evenly;
  align-items: center;
  margin: 10px 15px;
`;

export const TokenMain = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const TokenImgContainer = styled.div`
  display: flex;
  margin: 10px;
  img {
    width: 50px;
  }
  &:hover {
    cursor: pointer;
  }
`;

export const TokenAmountContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  position: relative;
`;

export const TokenAmountText = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;

  input {
    width: 11.5rem;
    border-style: none;
    background: transparent;
    outline: none;
    flox-grow: 1;
    color: #fff;
    font-size: 2rem;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  @keyframes gradient {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 100% 0;
    }
  }

  &:after {
    content: "";
    position: absolute;
    left: 0px;
    right: 45px;
    bottom: 0px;
    z-index: 1;
    height: 2px;
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
    background-position: 0% 0%;
    background: linear-gradient(
      to right,
      #df4242,
      #9929c6,
      #feffb8,
      #9929c6,
      #df4242,
      #9929c6
    );
    background-size: 500% auto;
    animation: gradient 3s linear infinite;
  }
`;

export const TokenBalanceContainer = styled.div`
  display: flex;
  position: absolute;
  font-size: 0.9rem;
  color: #df4242;
  top: 5px;
  right: 5px;
  &:hover {
    cursor: pointer;
  }
`;

export const ConvertButtonContainer = styled.div`
  display: flex;
`;

export const SelectResourceModalBg = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${({ showSelect }) => (showSelect ? 1 : 0)};
  visibility: ${({ showSelect }) => (showSelect ? "visible" : "hidden")};
  transition: visibility 0s, opacity 0.5s;
  z-index: 10;
`;

export const SelectResourceModal = styled.div``;

export const SelectResourceMenu = styled.div`
  display: flex;
  width: 360px;
  background: #463d3d;
  flex-direction: column;
  border-radius: 15px;
`;

export const SelectResourceMenuTitle = styled.div`
  display: flex;
  h3 {
    color: #fff;
  }
  margin: 15px;
`;

export const SelectResourceMenuBody = styled.div`
  display: flex;
  margin: 15px;
  flex-direction: column;
  max-height: 500px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0.5em;
  }

  &::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    outline: 1px solid slategrey;
  }
`;

export const SelectResourceMenuItem = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  transition: 0.3s;
  padding: 5px 5px;

  img {
    width: 60px;
    margin: 5px;
  }
  p#name {
    color: #fff;
    font-size: 1.3rem;
  }
  p#qt {
    color: #df4242;
    font-size: 1.3rem;
  }
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    cursor: pointer;
  }
`;

export const SelectResourceNameImg = styled.div`
  display: flex;
  align-items: center;
`;
