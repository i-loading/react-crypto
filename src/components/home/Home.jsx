import s from "./Home.module.scss";
import Table from "./Table";
import { useAppSelector } from "./../../store/hooks";

const HomePage = () => {
  const { isLoading, error } = useAppSelector((s) => s.currencies);

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
