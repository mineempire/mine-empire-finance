import styled from "styled-components";
export const DashboardSection = styled.section`
  background-position: center;
  background-size: cover;
  padding-top: clamp(80px, 25vh, 120px);
`;

export const TitleImageContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 120px;
  img {
    width: 30rem;
    max-width: 100%;
    max-height: 100%;
  }
`;

export const DashboardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media screen and (max-width: 1210px) {
    flex-direction: column;
    width: 100%;
  }
`;

export const TokenInfoCardContainer = styled.div`
  display: flex;
  align-items: center;
  @media screen and (max-width: 960px) {
    width: 100%;
    flex-direction: column;
  }
`;

export const TokenInfoCard = styled.div`
  display: flex;
  flex-wrap: wrap;
  background-color: #312525;
  border-radius: 15px;
  width: 360px;
  margin: 25px;
`;

export const TokenInfoCardImgContainer = styled.div`
  display: block;
  img {
    width: 80px;
    padding: 10px;
  }
`;
export const TokenInfoTitleContainer = styled.div`
  display: flex;
  width: 240px;
  align-items: center;
  align-content: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin: 0;

  img {
    width: 30px;
    margin: 0 5px 0 5px;
    &:hover {
      cursor: pointer;
    }
  }

  h1 {
    font-size: 25px;
    color: white;
    font-style: normal;
    font-weight: 700;
    margin: 3px 15px 3px 5px;
  }

  h3 {
    font-size: 24px;
    color: white;
    font-style: normal;
    font-weight: 400;
    margin: 0;
  }
`;

export const CardFeature = styled.div`
  display: flex;
  align-items: center;
  background-color: #463d3d;
  border-radius: 15px;
  padding: 3px 10px 3px 10px;

  img {
    margin: 0;
  }
`;

export const CardDescription = styled.div`
  display: flex;
  margin: 15px 0 0 0;
  max-width: 100%;
  flex-direction: column;
  align-items: center;
`;
export const SmallText = styled.p`
  font-size: 14px;
  color: white;
  font-style: normal;
  font-weight: 400;
  margin: 5px;
`;

export const SmallTextDollar = styled.p`
  font-size: 14px;
  background: none;
  color: #36d846;
  font-style: normal;
  font-weight: 600;
  margin: 5px;
`;

export const TokenInfoCardStats = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;

  h3#description {
    font-size: 16px;
    color: #949494;
    font-style: normal;
    font-weight: 600;
    width: 240px;
    margin: 0 0 5px 20px;
    text-align: left;
  }
  h3#stat {
    font-size: 16px;
    color: white;
    font-style: normal;
    font-weight: 600;
    width: 80px;
    margin: 0 0 5px 0;
    text-align: right;
  }
`;

export const CardButtonContainer = styled.div`
  display: flex;
  margin: 30px auto 30px auto;
`;

export const ContainerFlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const DataDiv = styled.div`
  display: flex;
  border-radius: 15px;
  background: radial-gradient(
    50% 50% at 50% 50%,
    rgba(153, 41, 198, 0.58) 0%,
    rgb(70.13, 60.78, 60.78) 95.57%
  );
  width: 360px;
  height: 160px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 15px;

  h1 {
    font-size: 2rem;
    color: #fff;
    font-style: normal;
    font-weight: 700;
    margin: 3px 15px 3px 5px;
  }

  h3 {
    font-size: 1rem;
    color: #949494;
    font-style: normal;
    font-weight: 400;
    margin: 0;
  }
`;

export const IncomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 760px;
  border-radius: 15px;
  align-items: center;
  background: radial-gradient(
    50% 50% at 50% 50%,
    rgba(153, 41, 198, 0.58) 0%,
    rgb(70.13, 60.78, 60.78) 95.57%
  );

  h1 {
    color: #fff;
    padding: 1rem 0;
  }

  @media screen and (max-width: 960px) {
    width: 360px;
  }
`;

export const IncomeTable = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  p {
    padding: 1rem;
  }
`;

export const ResourceIncomeTable = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  margin: 10px 0;
  flex-wrap: wrap;
  p {
    padding: 1rem;
  }

  @media screen and (max-width: 960px) {
    flex-direction: column;
  }
`;

export const IncomeItem = styled.div`
  display: flex;
  text-align: center;
  p {
    font-weight: 600;
    font-size: 1.2rem;
    color: #fff;
  }

  @media screen and (max-width: 960px) {
    p {
      font-weight: 400;
      font-size: 1rem;
    }
  }
`;

export const ResourceItem = styled.div`
  display: flex;
  align-items: center;
  width: 370px;
  justify-content: space-between;
  padding: 0 10px;
  text-align: center;
  p {
    color: #fff;
  }
  img {
    width: 50px;
  }
  button {
    height: 2.5rem;
  }

  @media screen and (max-width: 960px) {
    width: 360px;
  }
`;

export const IncomeLine = styled.div`
  width: 760px;
  height: 2px;
  background: linear-gradient(
    to right,
    #df4242,
    #9929c6,
    #feffb8,
    #9929c6,
    #df4242,
    #9929c6
  );

  @media screen and (max-width: 960px) {
    width: 360px;
  }
`;
