import React, { useState, useEffect, createContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// const coinCap = "cb43810c-6de4-40fb-bc91-0d70154fe289";
export const AppContext = createContext({
  currs: [],
  theme: "",
  themeHandler: () => {},
  currency: "",
  currencyHandler: () => {},
});

const AppProvider = ({ children }) => {
  const defaultTheme =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

  const [currencies, setCurrencies] = useState(
    () => JSON.parse(localStorage.getItem("currs")) || []
  );
  const [currentTheme, setCurrentTheme] = useState(
    () => localStorage.getItem("theme") || defaultTheme
  );
  const [currency, setCurrency] = useState(
    () => localStorage.getItem("currency") || "USD"
  );
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const themeHandler = (themeType) => {
    localStorage.setItem("theme", themeType);
    setCurrentTheme(themeType);
  };
  const currencyHandler = (curType) => {
    localStorage.setItem("currency", curType);
    setCurrency(curType);
  };
  const singleCurData = (curId) => {
    return currencies.filter((s) => s.symbol === curId);
  };

  const fetchCrypto = async () => {
    try {
      const res = await fetch(`https://api.coincap.io/v2/assets?limit=500`);
      const { data } = await res.json();
      const newData = [];
      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        const newElem = {
          id: element.id,
          name: element.name,
          symbol: element.symbol,
          rank: +Number(element.rank),
          supply: +Number(element.supply).toFixed(1),
          changePercent24Hr: +Number(element.changePercent24Hr).toFixed(1),
          marketCapUsd: +Number(element.marketCapUsd).toFixed(1),
          maxSupply: +Number(element.maxSupply).toFixed(0),
          priceUsd: +Number(element.priceUsd).toFixed(2),
          volumeUsd24Hr: +Number(element.volumeUsd24Hr).toFixed(0),
        };
        newData.push(newElem);
      }
      localStorage.setItem("currs", JSON.stringify(newData));
      setCurrencies(newData);
      setIsLoading(false);
    } catch (e) {
      setError(e.message);
      setIsLoading(false);
      throw new Error(e.message);
    }
  };

  useEffect(() => {
    fetchCrypto();
  }, []);

  const currencySymbol = {
    USD: "$",
  };
  const value = {
    currs: currencies,
    theme: currentTheme,
    themeHandler: themeHandler,
    currency: currencySymbol[currency],
    currencyHandler: currencyHandler,
    singleCurData: singleCurData,
    isLoading: isLoading,
    error: error,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AppProvider>
    <App />
  </AppProvider>
);
