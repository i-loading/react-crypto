import { useState, useContext } from "react";
import s from "./Header.module.scss";
import { AiFillCaretDown } from "react-icons/ai";
import { AppContext } from "./../../index";

const Currency = () => {
  const [isVisible, seTisVisible] = useState(false);
  const { currencyName, currencyHandler } = useContext(AppContext);

  const currencyOptionHandler = (curr) => {
    seTisVisible(false);
    currencyHandler(curr);
  };

  return (
    <div className={s.currency}>
      <div onClick={() => seTisVisible(!isVisible)}>
        <span>{currencyName}</span>
        <AiFillCaretDown />
      </div>
      <div className={`${isVisible ? s.menu_show : ""} ${s.menu} menu`}>
        <button onClick={() => currencyOptionHandler("USD")}>USD $</button>
        <button onClick={() => currencyOptionHandler("EUR")}>EUR €</button>
        <button onClick={() => currencyOptionHandler("UAH")}>UAH ₴</button>
      </div>
    </div>
  );
};

export default Currency;
