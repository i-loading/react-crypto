import { useState } from "react";
import s from "./Header.module.scss";
import { AiFillCaretDown } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "./../../store/hooks";
import { setLang } from "./../../store/slices/uiSlice";

const Language = () => {
  const [isVisible, seTisVisible] = useState(false);
  const lang = useAppSelector((s) => s.ui.lang);
  const dispatch = useAppDispatch();

  const langOptionHandler = (lang) => {
    seTisVisible(false);
    dispatch(setLang(lang));
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
