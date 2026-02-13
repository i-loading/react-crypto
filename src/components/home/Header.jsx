import { useMemo, memo } from "react";
import { useAppDispatch, useAppSelector } from "./../../store/hooks";
import { TickerTape } from "react-tradingview-embed";
import { BsFillSunFill } from "react-icons/bs";
import { IoMoonOutline } from "react-icons/io5";

import s from "./Header.module.scss";
import Currency from "./Currency";
import Language from "./Language";
import Search from "./Search";

import { setTheme } from "./../../store/slices/uiSlice";

const TickerStatic = memo(function TickerStatic({ widgetProps }) {
  return <TickerTape widgetProps={widgetProps} />;
});

const Header = () => {
  const theme = useAppSelector((s) => s.ui.theme);
  const lang = useAppSelector((s) => s.ui.lang);
  const dispatch = useAppDispatch();

  const tickerProps = useMemo(
    () => ({
      symbols: [
        { proName: "FOREXCOM:SPXUSD", title: "S&P 500" },
        { proName: "FX_IDC:EURUSD", title: "EUR/USD" },
        { proName: "BITSTAMP:BTCUSD", title: "Bitcoin" },
        { proName: "BITSTAMP:ETHUSD", title: "Ethereum" },
        { description: "Apple", proName: "NASDAQ:AAPL" },
        { description: "UAH/USD", proName: "FX_IDC:UAHUSD" },
      ],
      showSymbolLogo: true,
      colorTheme: theme,
      isTransparent: false,
      displayMode: "regular",
      locale: lang,
    }),
    [theme, lang],
  );

  const themeHandler = (t) => dispatch(setTheme(t));

  return (
    <header className={s.header}>
      <div className="container">
        <TickerStatic widgetProps={tickerProps} />
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
