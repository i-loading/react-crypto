import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";

import { AppContext } from "./index";
import Header from "./components/home/Header";
import Footer from "./components/home/Footer";
import HomePage from "./components/home/Home";
import SinglePage from "./components/single/SinglePage";
import NotFound from "./components/not-found/NotFound";
import Loader from "./components/Loader";

export default function App() {
  const { theme, isLoading, error } = useContext(AppContext);
  return (
    <div className={`${theme === "dark" ? "dark" : "light"} theme_wrap`}>
      <BrowserRouter basename="react-crypto/">
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
