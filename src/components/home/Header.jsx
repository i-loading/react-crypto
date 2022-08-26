import s from "./Header.module.scss";

import { TickerTape } from "react-tradingview-embed";
import { AiFillCaretDown, AiOutlineSearch } from "react-icons/ai";
import { BsFillSunFill } from "react-icons/bs";
import { IoMoonOutline } from "react-icons/io5";
import { useContext, useEffect, useRef } from "react";
import { AppContext } from "./../../index";

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

const Header = () => {
  const { theme, themeHandler } = useContext(AppContext);
  const ref = useRef();

  const handler = ({ key }) => {
    if (ESCAPE_KEYS.includes(String(key))) {
      ref.current.focus();
    }
  };

  useEventListener("keydown", handler);

  return (
    <header className={s.header}>
      <div className="container">
        <TickerTape
          widgetProps={{
            symbols: [
              {
                proName: "FOREXCOM:SPXUSD",
                title: "S&P 500",
              },
              {
                proName: "FX_IDC:EURUSD",
                title: "EUR/USD",
              },
              {
                proName: "BITSTAMP:BTCUSD",
                title: "Bitcoin",
              },
              {
                proName: "BITSTAMP:ETHUSD",
                title: "Ethereum",
              },
              {
                description: "Apple",
                proName: "NASDAQ:AAPL",
              },
              {
                description: "UAH/USD",
                proName: "FX_IDC:UAHUSD",
              },
            ],
            showSymbolLogo: true,
            colorTheme: theme,
            isTransparent: false,
            displayMode: "adaptive",
            locale: "en",
          }}
        />
        <div className={s["header_help"]}>
          <div className={s.lang}>
            <span>English</span>
            <AiFillCaretDown />
          </div>
          <div className={s.currency}>
            <span>USD</span>
            <AiFillCaretDown />
          </div>
          <div className={s.theme}>
            {theme === "dark" ? (
              <BsFillSunFill onClick={() => themeHandler("light")} />
            ) : (
              <IoMoonOutline onClick={() => themeHandler("dark")} />
            )}
          </div>
          <div
            className={`${theme === "dark" ? s.search_dark : s.search_light} ${
              s.search
            }`}
          >
            <AiOutlineSearch />
            <input type="text" placeholder="Search" ref={ref} />
            <div data-text="Use to trigger search">esc</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
