import styled from "styled-components";
import { Container } from "../../globalStyles";

export const Nav = styled.nav`
  background: transparent;
  margin-bottom: -80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  position: absolute;
  top: 0;
  z-index: 50;
  width: 100%;
  transition: background-color 0.3s ease-in;
`;

export const NavbarContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  height: 80px;
  ${Container}
`;

export const LogoContainer = styled.div`
  display: flex;
`;

export const NavIcon = styled.img`
  margin-right: 1rem;
  width: 3rem;
`;

export const MobileIcon = styled.div`
  display: none;
  z-index: 50;
  @media screen and (max-width: 960px) {
    display: flex;
    align-items: center;
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  justify-content: center;
  text-align: center;
  width: 100%;
  @media screen and (max-width: 960px) {
    flex-direction: column;
    width: 100%;
    height: 100vh;
    position: fixed;
    padding-top: 30%;
    top: 0;
    left: 0;
    opacity: ${({ show }) => (show ? 1 : 0)};
    visibility: ${({ show }) => (show ? "visible" : "hidden")};
    transition: all 0.5s ease;
    background-color: #111827;
  }
`;

export const NavItem = styled.li`
  height: 80px;
  cursor: pointer;
  @media screen and (max-width: 960px) {
    width: 100%;
    &:hover {
      border: none;
    }
  }
`;

export const NavLinks = styled.span`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0.5rem 1rem;
  height: 100%;
  &:hover {
    color: #ec1654;
    transition: all 0.3s ease;
  }
  @media screen and (max-width: 960px) {
    text-align: center;
    padding: 2rem;
    width: 100%;
    display: table;
    &:hover {
      color: #ec1654;
      transition: all 0.3s ease;
    }
  }
`;

export const ConnectWallet = styled.div`
  display: flex;
  width: 22rem;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
`;

export const Connected = styled.div`
  display: flex;
  color: #fff;
  dispaly: flex;
  align-items: center;
  border-radius: 15px;
  background: #463d3d;
  margin: 0.5rem;
  padding: 0 0 0 0.5rem;
  img {
    height: 40px;
    background: none;
    margin: 0.6rem;
  }
  p {
    background: none;
    font-weight: 200;
    font-size: 1rem;
    padding-right: 0.5rem;
  }
`;

export const SingleButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10%;
`;
