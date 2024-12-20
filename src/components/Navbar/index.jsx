import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchNews } from "../../store/actions";

function Navbar(props) {
const [searchTerm, setSearchTerm] = useState('');
const dispatch = useDispatch();

const handleSearch = () => {
  const query = {
    fq: `title:("${searchTerm}")`,
  };
  dispatch(fetchNews(query));
  setSearchTerm('');
};

  const links = [
    {
      title: "Indonesia",
      path: "/",
    },
    {
      title: "Programming",
      path: "/programming",
    },
    {
      title: "COVID-19",
      path: "/covid-19",
    },
    {
      title: "SAVED",
      path: "/saved",
    },
  ];

  return (
    <section className={styles.navbar}>
      <section className={styles.linksContainer }>
          {
            links.map((l) => {
              return <NavLink className={((props) => {
                return props.isActive ? styles.activeLink : styles.link
              })} key={l.title} to={l.path} >
                {l.title}
              </NavLink>
            })
          }
      </section>
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <button
          onClick={handleSearch}
          className={styles.searchBarBtn}
        >
          Search
        </button>
      </div>
    </section>
  );
}

export { Navbar };
