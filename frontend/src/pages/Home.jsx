import { useContext, useRef, useState, useEffect } from "react";
import axios from "../utils/axios";
import io from "socket.io-client";
import { toast } from "react-toastify";
import { SearchStore } from "../context/SearchProvider";
import ArticleCard from "../components/ArticleCard";
import { ThemeStore } from "../context/ThemeProvider";


const socket = io("http://localhost:5000");



const listenForNewArticles = (callback) => {
  socket.on("newArticle", callback);
};

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const { search, setSearch } = useContext(SearchStore);
  const { theme, setTheme } = useContext(ThemeStore);
  const [loading,setLoading] = useState(false)
  const [loadingCat,setLoadingCat] = useState(false)

const getCategories =async () => {
  setLoadingCat(true)
  try {
    const response = await axios.get(`news/`);
  const articles = response.data.data
      const categories = [...new Set(articles.map((article) => article.category))];
      console.log(categories)
      setCategories(categories);
    
  }  catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoadingCat(false);
    }

};
const getArticles = async () => {
  const categoryQuery = selectedCategories.length > 0 ?`category=${selectedCategories.join(',')}`:''
const searchQuery = search?`keyword=${search}`:''
const queryParams = [categoryQuery,searchQuery].filter(Boolean).join('&')
console.log(queryParams)
   try {
          setLoading(true)
  const response = await axios.get(`news?${queryParams}`);
      setLoading(false)
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
             getCategories();

      setArticles(data);
      }
      

      fetchData();
  
    console.log(selectedCategories)

 
  }, [search,selectedCategories]);
   listenForNewArticles((newArticle) => {
     // alert("New article available!");
     toast.success(newArticle.title, {
       theme: theme == "dark" ? "dark" : "light",
     });
     setArticles((prev) => [...prev, newArticle]);
   });
  // Handle category selection
  const toggleCategory = (category) => {
    setSelectedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return Array.from(newSet);
    });
  };

  return (
   <div className="flex">
      <aside className=" w-1/4 p-4 border-r border-light-background dark:border-dark-background">
        <h2 className="font-bold mb-4">Categories</h2>
       {
        loadingCat?('Loading...'): (categories.map((category) => (
          <div key={category}>
            <label>
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => toggleCategory(category)}
                className='m-2'
              />
              {category}
            </label>
          </div>
        )))
       }
      </aside>

      <main className="flex-1 p-6">
      
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          { loading?('Loading...'):
          (articles.map((article) => (
            <ArticleCard key={article.link} {...article} />
          )))}
        </div>
      </main>
    </div>
  );
};

export default Home;
