import qs from "qs";
import { NEWS_REDUCER_CASES } from "../reducers";

const REACT_APP_API_KEY="7UlI9qIEuSTKT9d2JsXJIKNZS7CV8cW9"
const BASE_API_URL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";

export function fetchNews(query) {
  return async function (dispatch) {
    console.log("#2 fetchNews()");
    try {
      dispatch({
        type: NEWS_REDUCER_CASES.FETCHING_NEWS,
      });
      const queryString = qs.stringify(
        {
          ...query,
          "api-key": REACT_APP_API_KEY,
        },
        { encode: true }
      );

      if (!REACT_APP_API_KEY) {
        console.error("API key is missing");
        dispatch({ type: NEWS_REDUCER_CASES.ERROR_FETCHING_NEWS, error: "API key is missing" });
        return;
      }

      console.log("#4 fetch api NY TIMES");
      const response = await fetch(`${BASE_API_URL}${queryString}`);
      const responseJSON = await response.json();

      if (!response.ok) {
        throw new Error(JSON.stringify(responseJSON));
      }

      console.log("responseJSON:", responseJSON);

      if (responseJSON && responseJSON.response && responseJSON.response.docs) {
        dispatch({
          type: NEWS_REDUCER_CASES.INSERT_NEWS,
          news: responseJSON.response.docs,
        });
      } else {
        console.error("Unexpected response format:", responseJSON);
        dispatch({ type: NEWS_REDUCER_CASES.ERROR_FETCHING_NEWS, error: "Unexpected response format" });
      }
    } catch (error) {
      console.error("[actions-fetchNews]:", error);
      dispatch({ type: NEWS_REDUCER_CASES.ERROR_FETCHING_NEWS, error: error.message });
    } finally {
      dispatch({
        type: NEWS_REDUCER_CASES.DONE_FETCHING_NEWS,
      });
    }
  };
}
