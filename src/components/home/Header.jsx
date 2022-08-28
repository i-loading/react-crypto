import { useContext } from "react";
import { TickerTape } from "react-tradingview-embed";
import { BsFillSunFill } from "react-icons/bs";
import { IoMoonOutline } from "react-icons/io5";

import s from "./Header.module.scss";
import { AppContext } from "./../../index";

import Currency from "./Currency";
import Language from "./Language";
import Search from "./Search";

const Header = () => {
  const { theme, themeHandler, lang } = useContext(AppContext);

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
            displayMode: "regular",
            locale: lang,
          }}
        />
        <div className={s["header_help"]}>
          <Language />
          <Currency />
          <div className={s.theme}>
            {theme === "dark" ? (
              <BsFillSunFill onClick={() => themeHandler("light")} />
            ) : (
              <IoMoonOutline onClick={() => themeHandler("dark")} />
            )}
          </div>
          <Search />
        </div>
      </div>
    </header>
  );
};

export default Header;
