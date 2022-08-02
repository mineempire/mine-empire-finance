import styled from "styled-components";

export const FarmsContainer = styled.div`
  display: flex;
`;

export const FarmContainer = styled.div`
  display: flex;
  width: 320px;
  border: 2px solid ${({ border }) => (border ? border : "black")};
  flex-direction: column;
  background: #371a5e;
  margin: 10px;
`;

export const FarmHeaderContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  h1 {
    font-size: 1rem;
    padding: 5px;
    color: white;
  }
`;

export const FarmExchangeAndNetworkContainer = styled.div`
  display: flex;
  img {
    width: 35px;
    padding: 5px;
  }
`;

export const FarmBodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 0;
`;

export const FarmBodyRow = styled.div`
  display: flex;
  justify-content: space-between;
  h3 {
    padding: 0 5px;
    font-weight: 400;
    color: white;
  }
`;

export const FarmBodyRowRewardTokenContainer = styled.div`
  display: flex;
  padding: 0 5px;
  img {
    width: 25px;
  }
`;
