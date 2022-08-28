import s from "./Footer.module.scss";

import logo from "../../assets/blockchain.png";
import appStore from "../../assets/app_store.svg";
import googlePlay from "../../assets/google_play.png";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "./../../index";

const Footer = () => {
  const { lang } = useContext(AppContext);

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
              <h4>{lang === "en" ? "Products" : "Продукты"}</h4>
              <li>
                {lang === "en"
                  ? "Blockchain Explorer"
                  : "Исследователь блокчейна"}
              </li>
              <li>{lang === "en" ? "Crypto API" : "Крипто API"}</li>
              <li>{lang === "en" ? "Crypto Indices" : "Крипто индексы"}</li>
              <li>{lang === "en" ? "Jobs Board" : "Доска вакансий"}</li>
            </ul>
            <ul>
              <h4>{lang === "en" ? "Company" : "Компания"}</h4>
              <li>{lang === "en" ? "About us" : "О нас"}</li>
              <li>{lang === "en" ? "Terms of use" : "Условия эксплуатации"}</li>
              <li>
                {lang === "en"
                  ? "Privacy Policy"
                  : "Политика конфиденциальности"}
              </li>
              <li>{lang === "en" ? "Careers" : "Карьеры"}</li>
            </ul>
            <ul>
              <h4>{lang === "en" ? "Support" : "Поддержка"}</h4>
              <li>{lang === "en" ? "Request Form" : "Форма запроса"}</li>
              <li>
                {lang === "en" ? "Contact Support" : "Контактная поддержка"}
              </li>
              <li>{lang === "en" ? "FAQ" : "ЧаВо"}</li>
              <li>{lang === "en" ? "Advertising" : "Реклама"}</li>
            </ul>
            <ul>
              <h4>{lang === "en" ? "Socials" : "Социальные сети"}</h4>
              <li>Facebook</li>
              <li>Twitter</li>
              <li>Instagram</li>
              <li>Telegram</li>
            </ul>
          </div>
        </div>
        <div className={s.footer_bottom}>
          <p>
            {lang === "en"
              ? "© 2022 React Crypto. All rights reserved"
              : "© 2022 React Crypto. Все права защищены"}
          </p>
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
