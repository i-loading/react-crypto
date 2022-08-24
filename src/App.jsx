import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";

import { AppContext } from "./index";
import Header from "./components/home/Header";
import Footer from "./components/home/Footer";
import HomePage from "./components/home/Home";
import SinglePage from "./components/single/SinglePage";
import NotFound from "./components/not-found/NotFound";

export default function App() {
  const { theme } = useContext(AppContext);
  return (
    <div className={`${theme === "dark" ? "dark" : "light"} theme_wrap`}>
      <BrowserRouter basename="react-crypto/">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/currency/:singleId" element={<SinglePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
