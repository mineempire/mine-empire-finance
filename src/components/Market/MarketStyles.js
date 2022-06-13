import styled from "styled-components";

export const NFTCard = styled.div`
  display: flex;
  flex-wrap: wrap;
  background-color: #312525;
  border-radius: 15px;
  width: 400px;
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
    margin: 1rem;
  }

  img {
    width: 85px;
    height: 83px;
  }
`;

export const NFTCardStats = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: max;
  width: 400px;
  margin: 25px 0 0 0;

  h3#description {
    font-size: 1rem;
    color: #949494;
    font-style: normal;
    font-weight: 600;
    width: 175px;
    margin: 0 0 5px 25px;
    text-align: left;
  }
  h3#stat {
    font-size: 1rem;
    color: #fff;
    font-style: normal;
    font-weight: 600;
    width: 175px;
    margin: 0 25px 5px 0;
    text-align: right;
  }
`;

export const MintAmount = styled.div`
  display: flex;
  align-items: center;
  color: white;
`;
