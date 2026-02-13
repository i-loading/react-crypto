import s from "./SinglePage.module.scss";

import { NavLink, useParams } from "react-router-dom";
import {
  AdvancedChart,
  TechnicalAnalysis,
  Ticker,
  CompanyProfile,
} from "react-tradingview-embed";
import numeral from "numeral";
import { useAppSelector } from "./../../store/hooks";
import React, { useRef, memo, useMemo } from "react";
import NotFound from "./../not-found/NotFound";
numeral.defaultFormat("0,0.00");

// --- NEW: a module-level, mount-once TradingView component that never updates ---
const TradingViewStatic = memo(
  function TradingViewStatic({ symbol, theme, lang, currency }) {
    return (
      <>
        <div className={s.main_part}>
          <AdvancedChart
            widgetProps={{
              height: 750,
              symbol,
              timezone: "Etc/UTC",
              theme,
              style: "1",
              locale: lang,
              toolbar_bg: "#f1f3f6",
              enable_publishing: false,
              withdateranges: true,
              range: "1D",
              hide_side_toolbar: false,
              container_id: `tradingview_${symbol.replace(/[^a-zA-Z0-9]/g, "_")}`,
            }}
          />
          <CompanyProfile
            widgetProps={{
              colorTheme: theme,
              isTransparent: false,
              symbol,
              locale: lang,
            }}
          />
        </div>
        <aside>
          <TechnicalAnalysis
            widgetProps={{
              interval: "1m",
              isTransparent: false,
              symbol,
              showIntervalTabs: true,
              locale: lang,
              colorTheme: theme,
            }}
          />
        </aside>
      </>
    );
  }, // only skip update if symbol/theme/lang/currency are ALL the same
  (prevProps, nextProps) => {
    // skip re-render only if symbol AND theme AND lang AND currency are ALL the same
    const shouldSkip =
      prevProps.symbol === nextProps.symbol &&
      prevProps.theme === nextProps.theme &&
      prevProps.lang === nextProps.lang &&
      prevProps.currency === nextProps.currency;

    return shouldSkip; // true = skip, false = re-render
  },
); // always skip updates after first mount
// --- END NEW ---

const TickerStatic = memo(function TickerStatic({ widgetProps }) {
  return <Ticker widgetProps={widgetProps} />;
});

const SinglePage = () => {
  const { singleId } = useParams();
  const theme = useAppSelector((s) => s.ui.theme);
  const currency = useAppSelector((s) =>
    s.ui.currencyName === "USD" ? "$" : s.ui.currencyName === "EUR" ? "€" : "₴",
  );
  const lang = useAppSelector((s) => s.ui.lang);
  const data = useAppSelector((s) =>
    s.currencies.currs.find((c) => c.symbol === singleId || c.id === singleId),
  );

  const stableDataRef = useRef(null);
  if (data) stableDataRef.current = data;
  const displayData = data || stableDataRef.current;

  // compute symbol from current displayData (updates when currency changes)
  const tvSymbol = displayData
    ? currency === "$"
      ? `${displayData.symbol}USD`
      : currency === "€"
        ? `${displayData.symbol}EUR`
        : `${displayData.symbol}UAH`
    : null;

  const tvTheme = theme;
  const tvLang = lang;

  const tickerProps = useMemo(
    () => ({
      symbols: [
        {
          proName: "FOREXCOM:SPXUSD",
          title: "S&P 500",
        },
        {
          proName: "FOREXCOM:NSXUSD",
          title: "US 100",
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
      ],
      colorTheme: theme,
      isTransparent: false,
      showSymbolLogo: true,
      locale: lang,
    }),
    [theme, lang],
  );

  if (!displayData) return <NotFound />;

  return (
    <>
      <section className={s.info}>
        <div className="container">
          <p className={s.crumbs}>
            <NavLink to="/">{lang === "en" ? "Home" : "Главная"}</NavLink>{" "}
            <span>{">"}</span> {displayData.name}
          </p>
          <div className={s.cur_info}>
            <div className={s["left_side"]}>
              <h4>
                {displayData.name} <span>{displayData.symbol}</span>
              </h4>
              <p className={s.rank}>
                {lang === "en" ? "Rank" : "Ранг"} #{displayData.rank}
              </p>
              <p>{lang === "en" ? "Coin" : "Монета"}</p>
            </div>
            <div className={s["right_side"]}>
              <span>
                {displayData.name} {lang === "en" ? "Price" : "Цена"}{" "}
                <small>({displayData.symbol})</small>
              </span>
              <h3>
                {`${currency}${numeral(displayData.priceUsd).format()}`}{" "}
                <p>{Number(displayData.changePercent24Hr).toFixed(1)}%</p>
              </h3>
              <div className={s["right_side-info"]}>
                <div>
                  <p>
                    {lang === "en" ? "Market Cap" : "Рыночная капитализация"}
                  </p>
                  <span>{`${currency}${numeral(displayData.marketCapUsd).format(
                    "0,0",
                  )}`}</span>
                </div>
                <div>
                  <p>{lang === "en" ? "Volume" : "Объем"}</p>
                  <span>{`${currency}${numeral(
                    displayData.volumeUsd24Hr,
                  ).format("0,0")}`}</span>
                </div>
                <div>
                  <p>
                    {lang === "en"
                      ? "Circulating Supply"
                      : "Циркулирующее предложение"}
                  </p>
                  <span>
                    {numeral(displayData.supply).format("0,0")}{" "}
                    {displayData.symbol}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={s.charts}>
        <div className="container">
          {tvSymbol && (
            <TradingViewStatic
              symbol={tvSymbol}
              theme={tvTheme}
              lang={tvLang}
              currency={currency}
            />
          )}
        </div>
      </section>
      <section className={s.related}>
        <div className="container">
          <h2>
            {lang === "en" ? "People also search for" : "Люди также ищут"}
          </h2>
          <TickerStatic widgetProps={tickerProps} />
        </div>
      </section>
    </>
  );
};

export default SinglePage;
