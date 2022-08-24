import s from "./Header.module.scss";

import { TickerTape } from "react-tradingview-embed";
import { AiFillCaretDown, AiOutlineSearch } from "react-icons/ai";
import { BsFillSunFill } from "react-icons/bs";
import { IoMoonOutline } from "react-icons/io5";
import { useContext } from "react";
import { AppContext } from "./../../index";

const Header = () => {
  const { theme, themeHandler } = useContext(AppContext);

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
            <input type="text" placeholder="Search" />
            <div data-text="Use to trigger search">/</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
