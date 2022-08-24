import { useContext } from "react";

import s from "./Home.module.scss";
import { AppContext } from "./../../index";
import Currency from "./Currency";

const HomePage = () => {
  const { currs } = useContext(AppContext);

  return (
    <main className={s.main}>
      <div className="container">
        <div className={s["table_wrap"]}>
          <table cellSpacing={0}>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Price</th>
                <th>1h %</th>
                <th>Market Cap</th>
                <th>Volume(24h)</th>
                <th>Circulating Supply</th>
              </tr>
            </thead>
            <tbody>
              {currs.map((curr) => (
                <Currency key={curr.id} {...curr} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
