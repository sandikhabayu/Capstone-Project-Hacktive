import styles from "./CommonPageLayout.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Navbar, NewsCard } from "../components";
import { useEffect } from "react";
import { NEWS_REDUCER_CASES } from "../store/reducers";
import { fetchNews } from "../store/actions";

function HomePage() {
  const newsReducer = useSelector(function (state) {
    return state;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("env:", process.env.REACT_APP_API_KEY);
    console.log("#1 useEffect()");
    const query = {
      fq: `glocations:("Indonesia")`,
    };

    dispatch(fetchNews(query));
  }, []);

  return (
    <main>
      <Navbar />
      <section className={styles.pageContainer}>
        <section>
          <h1>News</h1>
        </section>
        <section className={styles.newsContainer}>
          {newsReducer.news.map((n) => {
            const { headline, abstract, source, byline } = n;
            return (
              <NewsCard
                key={n._id}
                headline={headline.main}
                abstract={abstract}
                source={source}
                author={byline.original}
                onSave={() => {
                  dispatch({
                    type: NEWS_REDUCER_CASES.SAVE_NEWS,
                    news: n,
                  });
                }}
                onRemove={() => {
                  dispatch({
                    type: NEWS_REDUCER_CASES.UNSAVE_NEWS,
                    newsId: n._id,
                  });
                }}
              />
            );
          })}
        </section>
      </section>
    </main>
  );
}

export default HomePage;
