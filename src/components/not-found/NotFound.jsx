import s from "./NotFound.module.scss";
import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <section className={s["not_found"]}>
      <div className="container">
        <h1>Oops. Looks like nothing here =(</h1>
        <NavLink to="/">Back to home page</NavLink>
      </div>
    </section>
  );
};

export default NotFound;
