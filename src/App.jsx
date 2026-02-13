import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "./store/hooks";
import { useEffect } from "react";
import Header from "./components/home/Header";
import Footer from "./components/home/Footer";
import HomePage from "./components/home/Home";
import SinglePage from "./components/single/SinglePage";
import NotFound from "./components/not-found/NotFound";
import Loader from "./components/Loader";
import { fetchCrypto } from "./store/slices/currenciesSlice";

export default function App() {
  const theme = useAppSelector((s) => s.ui.theme);
  const { isLoading, error } = useAppSelector((s) => s.currencies);
  const currencyName = useAppSelector((s) => s.ui.currencyName);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCrypto());
  }, [currencyName, dispatch]);

  return (
    <div className={`${theme === "dark" ? "dark" : "light"} theme_wrap`}>
      <BrowserRouter basename="/react-crypto">
        <Header />
        <Routes>
          <Route
            path="/"
            element={isLoading && !error ? <Loader /> : <HomePage />}
          />
          <Route path="/currency/:singleId" element={<SinglePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
