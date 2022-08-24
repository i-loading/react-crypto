import s from "./Currency.module.scss";

import numeral from "numeral";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "./../../index";

numeral.defaultFormat("0,0.00");

const Currency = ({
  rank,
  name,
  symbol,
  priceUsd,
  changePercent24Hr,
  marketCapUsd,
  volumeUsd24Hr,
  supply,
}) => {
  const { currency } = useContext(AppContext);
  return (
    <tr className={s["single_cur"]}>
      <td>{rank}</td>
      <td>
        <NavLink to={`/currency/${symbol}`}>{`${name} (${symbol})`}</NavLink>
      </td>
      <td>{`${currency}${numeral(priceUsd).format()}`}</td>
      <td>{Number(changePercent24Hr).toFixed(1)}%</td>
      <td>{`${currency}${numeral(marketCapUsd).format("0,0")}`}</td>
      <td>{`${currency}${numeral(volumeUsd24Hr).format("0,0")}`}</td>
      <td>
        {numeral(supply).format("0,0")} {symbol}
      </td>
    </tr>
  );
};

export default Currency;
