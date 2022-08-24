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
    const res = await fetch(`https://api.coincap.io/v2/assets?limit=50`);
    const { data } = await res.json();
    localStorage.setItem("currs", JSON.stringify(data));
    setCurrencies(data);
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
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AppProvider>
    <App />
  </AppProvider>
);
