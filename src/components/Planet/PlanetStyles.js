import styled from "styled-components";

export const PlanetBody = styled.div`
  display: flex;
  height: 100%;
  margin: 15px;
`;

export const PlanetTitleContainer = styled.div`
  display: flex;
  width: 320px;
  background-color: #312525;
  border-radius: 15px;

  img {
    width: 134px;
    padding: 15px;
  }
`;

export const PlanetTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  align-items: center;
  padding: 15px;
  h1#title {
    color: #fff;
  }

  h1#description {
    color: #949494;
    font-size: 1.2rem;
    font-weight: 500;
  }
`;

export const PlanetDescription = styled.div`
  display: flex;
  width: 320px;
`;

export const DescriptionRow = styled.div`
  padding: 5px 25px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;

  h3#description {
    color: #949494;
    font-size: 1rem;
    font-weight: 400;
  }
  h3#value {
    color: #fff;
  }
`;

export const StakeContainer = styled.div`
  display: flex;
  width: 320px;
  background-color: #312525;
  border-radius: 15px;
  flex-direction: column;
  height: 100%;
`;

export const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin: 20px 0 0 0;
  padding-bottom: 15px;
`;

export const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 320px;
  background-color: #312525;
  border-radius: 15px;
  margin: 15px;
`;

export const PlanetContainer = styled.div`
  display: flex;
`;

export const PlanetBodyContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  @media screen and (max-width: 960px) {
    flex-direction: column;
  }
`;

export const ConverterContainer = styled.div`
  display: flex;
  background-color: #312525;
  border-radius: 15px;
  margin: 15px;

  @media screen and (max-width: 960px) {
    flex-direction: column;
  }
`;

export const ConversionBox = styled.div`
  display: flex;
  border-radius: 15px;
  background-color: #463d3d;
  margin: 15px;
  align-items: center;
  justify-content: center;
  img {
    margin: 5px;
    width: 50px;
  }
  p {
    color: #fff;
    font-size: 1.5rem;
  }

  @media screen and (max-width: 960px) {
    p {
      font-size: 1rem;
    }
  }
`;
