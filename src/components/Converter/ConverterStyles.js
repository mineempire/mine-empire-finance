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
  margin: 0 1rem 3rem 1rem;
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
  margin: 10px;
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
