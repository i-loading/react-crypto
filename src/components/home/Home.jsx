import s from "./Home.module.scss";
import Table from "./Table";
import { useContext } from "react";
import { AppContext } from "./../../index";

const HomePage = () => {
  const { isLoading, error } = useContext(AppContext);

  return error && !isLoading ? (
    <div
      className="container"
      style={{
        height: "75vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      Oops, error occurred: {error}
    </div>
  ) : (
    <main className={s.main}>
      <div className={`${s["table_wrap"]} container`}>
        <Table />
      </div>
    </main>
  );
};

export default HomePage;
