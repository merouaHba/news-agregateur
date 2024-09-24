import  { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

 const getArticles = async () => {
  const response = await axios.get("http://localhost:5000/api/v1/news/");
  return response.data;
};

 const listenForNewArticles = (callback) => {
  socket.on("newArticle", callback);
};

const Articles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getArticles();
      setArticles(data);
    };
    fetchData();

  listenForNewArticles((newArticle) => {
    alert("New article available!");
    setArticles((prev) => [...prev, newArticle]);
    console.log(newArticle);
  });
  }, []);

  return (
      <div>
          articles
      {articles.map((article) => (
        <div key={article._id}>
          <h3>{article.title}</h3>
          <p>{article.description}</p>
          <a href={article.link} target="_blank" rel="noopener noreferrer">
            Read more
          </a>
        </div>
      ))}
    </div>
  );
};

export default Articles;
