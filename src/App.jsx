import "./App.css";
import axios from "axios";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import { useState } from "react";
import { useEffect } from "react";

const App = () => {
  const [news, setNews] = useState([]);

  const apiKey = import.meta.env.VITE_NEWS_API_KEY;

  const filterNews = async (category) => {
    let link = "";
    if (category && category !== "everything") {
      link = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${apiKey}`;
    } else {
      link = `https://newsapi.org/v2/everything?q=keyword&apiKey=${apiKey}`;
    }
    const { data } = await axios.get(link);
    setNews(data.articles);
    console.log(data.articles);
  };

  useEffect(() => {
    filterNews();
  }, []);

  return (
    <>
      <Navbar filterNews={filterNews} />
      <Home news={news} />
      <Footer />
    </>
  );
};

export default App;
