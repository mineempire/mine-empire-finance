import styled from "styled-components";

export const PlanetCard = styled.div`
  display: flex;
  flex-wrap: wrap;
  background-color: #312525;
  border-radius: 15px;
  width: 360px;
  margin: 20px;

  @media screen and (max-width: 960px) {
    margin-left: auto;
    margin-right: auto;
  }
`;

export const PlanetCardImgContainer = styled.div`
  display: block;
  img {
    width: 120px;
    padding: 15px;
  }
`;

export const PlanetCardTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  width: 210px;

  h1 {
    color: #fff;
  }

  h3 {
    font-size: 1rem;
    color: #949494;
    font-style: normal;
    font-weight: 400;
    margin: 0;
  }
`;
export const PlanetCardProductionInfo = styled.div`
  display: flex;
  margin: 25px auto 25px auto;
  align-items: center;
  background-color: #463d3d;
  border-radius: 15px;

  img {
    margin: 10px;
    width: 30px;
  }

  h3#production {
    font-size: 1rem;
    color: #fff;
    font-style: normal;
    font-weight: 400;
    margin: 10px;
  }

  h3#amount {
    font-size: 1rem;
    color: #df4242;
    font-style: normal;
    font-weight: 600;
    margin: 0;
    margin: 10px;
  }
`;

export const CardStats = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: max;
  width: 480px;

  h3#description {
    font-size: 1rem;
    color: #949494;
    font-style: normal;
    font-weight: 600;
    width: 145px;
    margin: 0 0 5px 25px;
    text-align: left;
  }
  h3#stat {
    font-size: 1rem;
    color: #fff;
    font-style: normal;
    font-weight: 600;
    width: 165px;
    margin: 0 25px 5px 0;
    text-align: right;
  }
`;
