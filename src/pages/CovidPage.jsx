import styles from "./CommonPageLayout.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Navbar, NewsCard } from "../components";
import { useEffect } from "react";
import { NEWS_REDUCER_CASES } from "../store/reducers";
import { fetchNews } from "../store/actions";

function CovidPage() {
  const newsReducer = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNews({
        q: "Covid",
        fq: 'news_desk:("Covid19")',
    }));
  }, []);

  return (
    <main>
      <Navbar />
      <section className={styles.pageContainer}>
        <section>
          <h1>Covid News</h1>
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

export default CovidPage;


// import styles from "./CommonPageLayout.module.css";
// import { useSelector, useDispatch } from "react-redux";
// import { Navbar, NewsCard } from "../components";
// import { useEffect } from "react";
// import { NEWS_REDUCER_CASES } from "../store/reducers";
// import { fetchNews } from "../store/actions";

// function CovidPage() {
//     const newsReducer = useSelector((state) => {
//         return state;
//     });
//     const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchNews({
//         q: "Covid-19",
//         fq: 'news_desk:("Covid")',
//     }));
//   }, []);
//     return (
//         <main>
//             <Navbar />
//             <section className={styles.pageContainer}>
//             <section>
//                 <h1>Covid News</h1>
//             </section>
//             <section className={styles.newsContainer}>
//                 {newsReducer.news.map((n) =>{
//                     const {headline, abstract, source, byline} = n;
//                     return (
//                         <NewsCard
//                         key={n._id}
//                         headline={headline.main}
//                         abstract={abstract}
//                         source={source}
//                         author={byline.original}
//                         onSave={() => {
//                             dispatch({
//                                 type: NEWS_REDUCER_CASES.SAVE_NEWS,
//                             news: n,
//                   });
//                 }}
//                         onRemove={() => {
//                             dispatch({
//                                 type: NEWS_REDUCER_CASES.UNSAVE_NEWS,
//                             newsId: n._id,
//                   });
//                 }}
//                         />
//                     );
//                 })}
//             </section>
//             </section>
//         </main>
//     );
// }


// export default CovidPage;