import { useState, useContext } from "react";
import s from "./Header.module.scss";
import { AiFillCaretDown } from "react-icons/ai";
import { AppContext } from "./../../index";

const Language = () => {
  const [isVisible, seTisVisible] = useState(false);
  const { lang, langHandler } = useContext(AppContext);

  const langOptionHandler = (lang) => {
    seTisVisible(false);
    langHandler(lang);
  };

  return (
    <div className={s.lang}>
      <div onClick={() => seTisVisible(!isVisible)}>
        <span>{lang === "en" ? "English" : "Русский"}</span>
        <AiFillCaretDown />
      </div>
      <div
        className={`${isVisible ? s.menu_show : ""} ${s.menu} ${
          s.menu_lang
        } menu`}
      >
        <button onClick={() => langOptionHandler("en")}>English</button>
        <button onClick={() => langOptionHandler("ru")}>Русский</button>
      </div>
    </div>
  );
};

export default Language;
