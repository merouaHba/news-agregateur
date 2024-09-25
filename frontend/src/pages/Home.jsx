import { useContext, useRef, useState, useEffect } from "react";
import axios from "../utils/axios";
import io from "socket.io-client";
import { toast } from "react-toastify";
import { SearchStore } from "../context/SearchProvider";
import ArticleCard from "../components/ArticleCard";
import { ThemeStore } from "../context/ThemeProvider";
import { CategoriesStore } from "../context/CategoriesProvider";
import { UserStore } from "../context/userprovider";


const socket = io(import.meta.env.VITE_BASE_URL);



const listenForNewArticles = (callback) => {
  socket.on("newArticle", callback);
};

const Home = () => {
  const [articles, setArticles] = useState([]);
  const { selectedCategories, setSelectedCategories } =
    useContext(CategoriesStore);
  const { search, setSearch } = useContext(SearchStore);
  const { theme, setTheme } = useContext(ThemeStore);
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useContext(UserStore); // State to store user data

  const getArticles = async () => {
    const categoryQuery =
      selectedCategories.length > 0
        ? `category=${selectedCategories.join(",")}`
        : "";
    const searchQuery = search ? `keyword=${search}` : "";
    const queryParams = [categoryQuery, searchQuery].filter(Boolean).join("&");
    console.log(queryParams);
    try {
      setLoading(true);
      const response = await axios.get(`news?${queryParams}`);
      setLoading(false);
      return response.data;
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getArticles();

      setArticles(data);
    };

    fetchData();

    console.log(selectedCategories);
  }, [search, selectedCategories, user]);

  useEffect(() => {
    // Set up socket listener for new articles
    const handleNewArticle = (newArticle) => {
      toast.success(newArticle.title, {
        theme: theme === "dark" ? "dark" : "light",
      });
      setArticles((prev) => [...prev, newArticle]);
    };

    listenForNewArticles(handleNewArticle);

    // Cleanup function to remove the listener when component unmounts
    return () => {
      socket.off("newArticle", handleNewArticle);
    };
  }, [theme]); // Only re-run when theme changes

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {loading
        ? "Loading..."
        : articles.map((article) => (
            <ArticleCard key={article.link} {...article} />
          ))}
    </div>
  );
};

export default Home;
