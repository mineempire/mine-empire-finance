import React from "react";

import {
  FooterLogo,
  SocialIcon,
  FooterSocialIcon,
  FooterWrapper,
  FooterContainerFlex,
} from "./FooterStyles";

function Footer() {
  return (
    <FooterWrapper>
      <FooterContainerFlex>
        <FooterLogo to="/">
          <SocialIcon src="../../assets/logo.png" />
        </FooterLogo>

        <FooterSocialIcon
          href="https://twitter.com/mine_empire"
          target="_blank"
          aria-label="Twitter"
        >
          <img src="../../assets/twitter.png" alt="" />
        </FooterSocialIcon>
        <FooterSocialIcon
          href="https://discord.gg/ZtH6KtpqGQ"
          target="_blank"
          aria-label="Discord"
        >
          <img src="../../assets/discord.png" alt="" />
        </FooterSocialIcon>
        <FooterSocialIcon
          href="https://t.me/mineempire"
          target="_blank"
          aria-label="Telegram"
        >
          <img src="../../assets/telegram.png" alt="" />
        </FooterSocialIcon>
        <FooterSocialIcon
          href="https://aslan-1.gitbook.io/mine-empire/"
          target="_blank"
          aria-label="Gitbook"
        >
          <img src="../../assets/gitbook.png" alt="" />
        </FooterSocialIcon>
      </FooterContainerFlex>
    </FooterWrapper>
  );
}

export default Footer;
