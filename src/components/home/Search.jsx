import { useState, useContext, useEffect, useRef } from "react";
import s from "./Header.module.scss";
import { AiOutlineSearch } from "react-icons/ai";
import { AppContext } from "./../../index";
import { NavLink } from "react-router-dom";
import numeral from "numeral";
numeral.defaultFormat("0,0.00");

const ESCAPE_KEYS = ["27", "Escape"];
const useEventListener = (eventName, handler, element = window) => {
  const savedHandler = useRef();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const eventListener = (event) => savedHandler.current(event);
    element.addEventListener(eventName, eventListener);
    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
};

const Search = () => {
  const { currs, currency, theme, lang } = useContext(AppContext);
  const [isVisible, setIsVisible] = useState(false);
  const [initialCurrs, setInitialCurrs] = useState([]);
  const ref = useRef();

  const handler = ({ key }) => {
    if (ESCAPE_KEYS.includes(String(key))) {
      ref.current.focus();
      setIsVisible(true);
      return;
    }
  };

  useEventListener("keydown", handler);

  const onChangeHandler = (e) => {
    const shownCurrs = currs
      .filter((curr) =>
        curr.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
      .slice(0, 5);
    setInitialCurrs(shownCurrs);
    setIsVisible(true);
  };

  return (
    <div className={s.input_wrap}>
      <div className={`${theme === "dark" ? "" : s.search_light} ${s.search}`}>
        <AiOutlineSearch />
        <input
          type="text"
          placeholder={lang === "en" ? "Start typing..." : "Начните писать..."}
          onChange={onChangeHandler}
          onFocus={() => setIsVisible(true)}
          onBlur={() =>
            setTimeout(() => {
              setIsVisible(false);
            }, 100)
          }
          ref={ref}
        />
        <div
          data-text={
            lang === "en"
              ? "Use to trigger search"
              : "Нажмите, чтобы начать поиск"
          }
        >
          esc
        </div>
      </div>
      <div
        className={`${isVisible ? s.menu_show : ""} ${s.menu} ${
          s.menu_search
        } menu`}
      >
        {initialCurrs.length > 0
          ? initialCurrs.map((smallCurr) => (
              <NavLink key={smallCurr.id} to={`/currency/${smallCurr.symbol}`}>
                {smallCurr.name}
                <span>
                  {`${currency}${numeral(smallCurr.priceUsd).format()}`}
                </span>
              </NavLink>
            ))
          : "Nothing found yet..."}
      </div>
    </div>
  );
};

export default Search;
