import MobileMenuWrapper from "./MobileMenu.style";
import Logo from "../../../assets/images/logo.png";
import Telegram from "../../../assets/images/icons/telegram.svg";
import Discord from "../../../assets/images/icons/discord.svg";
import Twitter from "../../../assets/images/icons/twitter.svg";
import Facebook from "../../../assets/images/icons/facebook.svg";
import Instagram from "../../../assets/images/icons/instagram.svg";
import { AiOutlineClose } from "react-icons/ai";
import ConnectWalletButton from "../../button/ConnectWalletButton";
// import Whitepaper from "../../../assets/pdf/whitepaper.pdf";

const MobileMenu = ({ mobileMenuHandle }) => {
  return (
    <MobileMenuWrapper>
      <div className="gittu-mobile-menu-content">
        <div className="mobile-menu-top">
          <a className="mobile-logo" href="/">
            <img src={Logo} alt="Logo" />
          </a>
          <button className="mobile-menu-close" onClick={mobileMenuHandle}>
            <AiOutlineClose />
          </button>
        </div>

        {/* <ul className="mobile-menu-list mb-40">
          <li>
            <a href="/">Demo one</a>
          </li>
          <li>
            <a href="/home-two">Demo two</a>
          </li>
          <li>
            <a href="/home-three">Demo three</a>
          </li>
          <li>
            <a href="/home-four">Demo four</a>
          </li>
        </ul> */}

        <ul className="mobile-social-links mb-40">
          <li>
            <a
              href="https://t.me/rexxcoin"
              target="_blank"
              rel="noreferrer"
            >
              <img src={Telegram} alt="icon" />
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com/RexxCoin"
              target="_blank"
              rel="noreferrer"
            >
              <img src={Twitter} alt="icon" />
            </a>
          </li>
          <li>
            <a
              href="https://Instagram.com/rexxcoin.official/"
              target="_blank"
              rel="noreferrer"
            >
              <img src={Instagram} alt="icon" />
            </a>
          </li>
          <li>
            <a
              href="https://facebook.com/rexxcoin.official/"
              target="_blank"
              rel="noreferrer"
            >
              <img src={Facebook} alt="icon" />
            </a>
          </li>
        </ul>

        <ul className="mobile-menu-list mb-40">
          <li>
            <a href="https://coinrexx.com/Rexx-Whitepaper.pdf" target="_blank" rel="noreferrer">
              Whitepaper
            </a>
          </li>
          <li>
            <a
              href="https://coinrexx.com"
              target="_blank"
              rel="noreferrer"
            >
              Official Website
            </a>
          </li>
        </ul>

        <div className="d-flex justify-content-center">
          <ConnectWalletButton />
        </div>
      </div>
    </MobileMenuWrapper>
  );
};

export default MobileMenu;
