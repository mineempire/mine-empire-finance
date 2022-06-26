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
    color: ${({ miningStatus }) =>
      miningStatus === "Mining"
        ? "green"
        : miningStatus === "Idle"
        ? "yellow"
        : miningStatus === "At Capacity"
        ? "red"
        : "#fff"};
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

export const SelectDrillModalAcitve = styled.div`
  visibility: visible;
  opacity: 1;
`;

export const SelectDrillModalBg = styled.div`
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
`;

export const SelectDrillModal = styled.div``;

export const PlanetButtonContainer = styled.div`
  display: flex;
`;

export const SelectDrillMenu = styled.div`
  display: flex;
  width: 360px;
  background: #463d3d;
  flex-direction: column;
  border-radius: 15px;
`;

export const SelectDrillMenuTitle = styled.div`
  display: flex;
  h3 {
    color: #fff;
  }
  margin: 15px;
`;

export const SelectDrillMenuBody = styled.div`
  display: flex;
  margin: 15px;
  flex-direction: column;
  height: 500px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0.5em;
  }

  &::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    outline: 1px solid slategrey;
  }
`;

export const SelectDrillMenuItem = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  transition: 0.3s;
  padding: 5px 0;

  img {
    width: 60px;
    margin: 5px;
  }
  p {
    color: #fff;
    font-size: 1.3rem;
  }
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    cursor: pointer;
  }
`;
