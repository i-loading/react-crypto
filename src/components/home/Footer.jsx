import s from "./Footer.module.scss";

import logo from "../../assets/blockchain.png";
import appStore from "../../assets/app_store.svg";
import googlePlay from "../../assets/google_play.png";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className={s.footer}>
      <div className="container">
        <div className={s.footer_top}>
          <NavLink to="/">
            <h1>
              <img src={logo} alt="" /> React Crypto
            </h1>
          </NavLink>
          <div className={s.links}>
            <ul>
              <h4>Products</h4>
              <li>Blockchain Explorer</li>
              <li>Crypto API</li>
              <li>Crypto Indices</li>
              <li>Jobs Board</li>
            </ul>
            <ul>
              <h4>Company</h4>
              <li>About us</li>
              <li>Terms of use</li>
              <li>Privacy Policy</li>
              <li>Careers</li>
            </ul>
            <ul>
              <h4>Support</h4>
              <li>Request Form</li>
              <li>Contact Support</li>
              <li>FAQ</li>
              <li>Advertising</li>
            </ul>
            <ul>
              <h4>Socials</h4>
              <li>Facebook</li>
              <li>Twitter</li>
              <li>Instagram</li>
              <li>Telegram</li>
            </ul>
          </div>
        </div>
        <div className={s.footer_bottom}>
          <p>© 2022 React Crypto. All rights reserved</p>
          <div>
            <img src={appStore} alt="" />
            <img src={googlePlay} alt="" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
