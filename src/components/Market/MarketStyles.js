import styled from "styled-components";

export const NFTCard = styled.div`
  display: flex;
  flex-wrap: wrap;
  background-color: #312525;
  border-radius: 15px;
  width: 320px;
  margin: 25px;
  justify-content: center;

  img#drill-image {
    width: 300px;
    padding: 15px;
  }
`;

export const NFTCardHeader = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 1rem;
  color: white;

  h1 {
    margin: 0.7rem;
  }

  img {
    width: 45px;
    height: 43px;
  }
`;

export const NFTCardStats = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 15px;
`;

export const NFTCardStatsRowWithImg = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;

  h3#stat {
    padding-right: 5px;
    font-size: 1rem;
    color: #fff;
    font-style: normal;
    font-weight: 600;
  }

  img {
    width: 15px;
    margin-top: -5px;
  }
`;

export const NFTCardStatsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
  padding: 2px 15px;

  h3#description {
    font-size: 1rem;
    color: #949494;
    font-style: normal;
    font-weight: 600;
  }
  h3#stat {
    font-size: 1rem;
    color: #fff;
    font-style: normal;
    font-weight: 600;
  }
`;

export const MarketContainer = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;

  @media screen and (max-width: 960px) {
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
`;
