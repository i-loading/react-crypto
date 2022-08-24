import s from "./SinglePage.module.scss";

import { NavLink, useParams } from "react-router-dom";
import {
  AdvancedChart,
  TechnicalAnalysis,
  Ticker,
  CompanyProfile,
  Timeline,
} from "react-tradingview-embed";
import { useContext } from "react";
import { AppContext } from "./../../index";
import numeral from "numeral";
numeral.defaultFormat("0,0.00");

const SinglePage = () => {
  const { singleId } = useParams();
  const { theme, currency, singleCurData } = useContext(AppContext);
  const [data] = singleCurData(singleId);

  return (
    <>
      <section className={s.info}>
        <div className="container">
          <p className={s.crumbs}>
            <NavLink to="/">Home</NavLink> <span>{">"}</span> {data.name}
          </p>
          <div className={s.cur_info}>
            <div className={s["left_side"]}>
              <h4>
                {data.name} <span>{data.symbol}</span>
              </h4>
              <p className={s.rank}>Rank #{data.rank}</p>
              <p>Coin</p>
            </div>
            <div className={s["right_side"]}>
              <span>
                {data.name} Price <small>({data.symbol})</small>
              </span>
              <h3>
                {`${currency}${numeral(data.priceUsd).format()}`}{" "}
                <p>{Number(data.changePercent24Hr).toFixed(1)}%</p>
              </h3>
              <div className={s["right_side-info"]}>
                <div>
                  <p>Market Cap</p>
                  <span>{`${currency}${numeral(data.marketCapUsd).format(
                    "0,0"
                  )}`}</span>
                </div>
                <div>
                  <p>Volume</p>
                  <span>{`${currency}${numeral(data.volumeUsd24Hr).format(
                    "0,0"
                  )}`}</span>
                </div>
                <div>
                  <p>Circulating Supply</p>
                  <span>
                    {numeral(data.supply).format("0,0")} {data.symbol}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={s.charts}>
        <div className="container">
          <div className={s.main_part}>
            <AdvancedChart
              widgetProps={{
                height: 750,
                symbol: `${data.symbol}USD`,
                timezone: "Etc/UTC",
                theme,
                style: "1",
                locale: "en",
                toolbar_bg: "#f1f3f6",
                enable_publishing: false,
                withdateranges: true,
                range: "1D",
                hide_side_toolbar: false,
                container_id: "tradingview_06333",
              }}
            />
            <CompanyProfile
              widgetProps={{
                colorTheme: theme,
                isTransparent: false,
                symbol: `${data.symbol}USD`,
                locale: "en",
              }}
            />
          </div>
          <aside>
            <TechnicalAnalysis
              widgetProps={{
                interval: "1m",
                isTransparent: false,
                symbol: `${data.symbol}USD`,
                showIntervalTabs: true,
                locale: "en",
                colorTheme: theme,
              }}
            />
            <Timeline
              widgetProps={{
                feedMode: "symbol",
                colorTheme: theme,
                isTransparent: false,
                displayMode: "regular",
                locale: "en",
                symbol: `${data.symbol}USD`,
              }}
            />
          </aside>
        </div>
      </section>
      <section className={s.related}>
        <div className="container">
          <h2>People also search for</h2>
          <Ticker
            widgetProps={{
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
              locale: "en",
            }}
          />
        </div>
      </section>
    </>
  );
};

export default SinglePage;
