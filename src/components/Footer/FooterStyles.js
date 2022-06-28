import styled from "styled-components";
import { Link } from "react-router-dom";

export const FooterContainer = styled.div`
  background-color: #101522;
  padding: 4rem 0 2rem 0;
`;

export const FooterWrapper = styled.div`
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
`;

export const FooterContainerFlex = styled.div`
  display: flex;
  justify-content: center;
  bottom: 0;
  height: 55px;
  margin-top: -55px;
  position: relative;
  align-items: center;

  @media screen and (max-width: 1000px) {
    align-items: center;
  }
`;

export const FooterLogo = styled(Link)`
  color: #fff;
  justify-self: start;
  cursor: pointer;
  text-decoration: none;
  font-size: 2rem;
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

export const SocialIcon = styled.img`
  margin-right: 10px;
  width: 30px;
`;

export const FooterSocialIcon = styled.a`
  color: #fff;
  font-size: 24px;
  img {
    width: 30px;
  }
`;
export const FooterNotes = styled.div`
  display: flex;
  justify-content: center;
  p {
    color: #fff;
    font-size: 0.8rem;
  }
`;
