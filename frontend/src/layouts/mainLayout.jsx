import { Outlet } from "react-router-dom";
import Navbar from "../components/NavBar";
import { useContext, useEffect, useState } from "react";
import { CategoriesStore } from "../context/CategoriesProvider";
import axios from "../utils/axios";


const MainLayout = () => {
  const [loadingCat, setLoadingCat] = useState(false);
  const {categories, setCategories, selectedCategories, setSelectedCategories} = useContext(CategoriesStore);
 useEffect(() => {
    const getCategories = async () => {
      setLoadingCat(true);
      try {
        const response = await axios.get(`news/`);
        const articles = response.data.data;
        const categories = [
          ...new Set(articles.map((article) => article.category)),
        ];
        console.log(categories);
        setCategories(categories);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoadingCat(false);
      }
    };
    getCategories();
 }, [])
 

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
    <>
      <Navbar />
      <div className="min-h-[89vh] text-light-text dark:text-dark-text bg-light-secondary dark:bg-dark-secondary">
        <div className="flex">
          <aside className=" w-1/4 p-4 border-r border-light-background dark:border-dark-background">
            <h2 className="font-bold mb-4">Categories</h2>
            {loadingCat
              ? "Loading..."
              : categories.map((category) => (
                  <div key={category}>
                    <label>
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => toggleCategory(category)}
                        className="m-2"
                      />
                      {category}
                    </label>
                  </div>
                ))}
          </aside>

          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}

export default MainLayout