import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "./store/actions";
import { Axios } from "axios";
import { NewsCard, Navbar } from "./components";
import styles from "./App.module.css"

const API_RESPONSE_STATUSES = {
    TRUE: "true",
    FALSE: "false",
};

function App() {
    const [searchNewsKeyword, setSearchNewsKeyword] = useState ("news");
    const dispatch = useDispatch();
    const news = useSelector((state) => state.news || []);

    const fetchNewsData = async () => {
        try {
            const apiURL = fetchNews.env.BASE_API_URL;
            const response = await fetch(apiURL);
            const respJSON = await response.json();

        if (!response.ok ||
            (respJSON.Response && 
            respJSON.Response.toLowerCase() === API_RESPONSE_STATUSES.FALSE)) {
            throw respJSON;
          }
          
          const result = respJSON.Search.map((m) => ({
            _id: m.id,
            headline: { main },
            abstract: m.abstract || "No abstract available",
            source: m.source || "Unknown source",
            byline: { original: m.byline?.original || "Unknown author" },
          }));
    
          dispatch({
            type: "INSERT_NEWS",
            news: result,
          });
        } catch (err) {
          console.error("[fetchNewsData]:", err);
        }
    };

        useEffect(() => {
            fetchNewsData();
          }, []);
        
          return (
            <main className={styles.main}>
              <Navbar
              onChange={(value) => {
                setSearchNewsKeyword(value);
              }}
              onClick = {() => {
                fetchNewsData();
              }}
              />
              <section className={styles.container}>
                <section>
                  <h1>News</h1>
                </section>
                <section className={styles.newsListContainer}>
                return (
                {news.map((n) => (
                        <NewsCard
                        key={`${n._id}`}
                        headline={n.headline.main}
                        abstract={n.abstract}
                        source={n.source}
                        author={n.byline.original}
                        />
                ))}
                  )
                </section>
              </section>
            </main>
            );
}

export default App;