import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Montserrat', sans-serif;
}
body {

    background: #111827;
}
`;

export const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  padding-bottom: 55px;
`;

export const Container = styled.div`
  width: 100%;
  max-width: 1300px;
  margin-right: auto;
  margin-left: auto;
  padding: 0 50px;

  @media screen and (max-width: 960px) {
    padding: 0 30px;
  }
`;

export const Button = styled.button`
  border-radius: 15px;
  border: none;
  box-shadow: 0 0 0px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  font-weight: 700;
  padding: 10px 25px;
  background: linear-gradient(
    180deg,
    rgb(223.12, 66.01, 66.01) 0%,
    rgb(153, 41, 198) 100%
  );
  font-size: ${({ size }) => (size ? size : "16px")};
  font-style: normal;
  font-weight: 600;
  color: #fff;
  margin: 0 10px 0 10px;
  transition: 0.3s;
  opacity: 1;
  &:hover {
    opacity: 0.9;
  }
  &:active {
    transition: 0s;
    transform: scale(0.98);
  }
`;

export const Row = styled.div`
  display: flex;
  justify-content: ${({ justify }) => (justify ? justify : "")};
  align-items: ${({ align }) => (align ? align : "")};
  gap: ${({ gap }) => (gap ? gap : "")};
  padding: ${({ padding }) => (padding ? padding : "")};
  margin: ${({ margin }) => (margin ? margin : "")};
  position: ${({ position }) => (position ? position : "")};
  width: ${({ width }) => (width ? width : "auto")};
  min-width: ${({ minWidth }) => (minWidth ? minWidth : "auto")};
  max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : "auto")};
  height: ${({ height }) => (height ? height : "auto")};
  max-height: ${({ maxHeight }) => (maxHeight ? maxHeight : "auto")};
  min-height: ${({ minHeight }) => (minHeight ? minHeight : "auto")};
  flex-wrap: ${({ wrap }) => (wrap ? wrap : "")};
`;

export const Section = styled.section`
  background-position: center;
  background-size: cover;
  padding-top: clamp(80px, 25vh, 120px);
`;

export const TitleContainer = styled.div`
  display: flex;
  color: white;
  flex-direction: column;
  margin-bottom: 5rem;

  h1 {
    font-size: 3rem;
  }
  h3 {
    font-weight: 400;
  }
`;

export const BodyContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  flex-wrap: wrap;
  @media screen and (max-width: 960px) {
    flex-direction: column;
    width: 100%;
  }
`;

export const CardButtonContainer = styled.div`
  display: flex;
  margin: 30px auto 30px auto;
`;

export default GlobalStyle;
