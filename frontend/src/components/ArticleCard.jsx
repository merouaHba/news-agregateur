



import { useContext, useState } from "react";
import { AiOutlineRead, AiOutlineHeart,AiFillHeart } from "react-icons/ai"; // For read icons
import axios from "../utils/axios";
import { UserStore } from "../context/userprovider";
import { toast } from "react-toastify";
import { ThemeStore } from "../context/ThemeProvider";


const ArticleCard = ({
  title,
  description,
  link,
  _id:articleId,

}) => {
      const { theme, setTheme } = useContext(ThemeStore);

  const {user, setUser} = useContext(UserStore); // State to store user data
  const isRead = user ? user.readArticles.includes(articleId) : false;
  const isFavorite = user ? user.favouriteArticles?.includes(articleId) : false;
  const [readStatus, setReadStatus] = useState(isRead);
  const [favoriteStatus, setFavoriteStatus] = useState(isFavorite);

  const handleMarkAsRead = async () => {
    if (!user) {
       toast.error('you should loged in first', {
         theme: theme == "dark" ? "dark" : "light",
       });
    } else {
       try {
      await axios.put(`news/${articleId}/read`);
      setReadStatus(!readStatus);
    } catch (error) {
      console.error("Error marking article as read", error);
    }
    }
   
  };

  const handleToggleFavorite = async () => {
    if (!user) {
      toast.error('you should loged in first', {
        theme: theme == "dark" ? "dark" : "light",
      })
    } else {
      try {
        await axios.put(`news/${articleId}/favourite`, {
          favorite: !favoriteStatus,
        });
        setFavoriteStatus(!favoriteStatus);
      } catch (error) {
        console.error("Error toggling favorite", error);
      }
    }
  };

  return (
    <div className="max-w-sm mx-auto my-4 bg-light-background dark:bg-dark-background rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 relative">
      <div className="absolute top-3 right-3 flex space-x-2">
        {/* Only show "Mark as Read" button if the article is not already marked as read */}
        {!readStatus && (
          <button
            onClick={handleMarkAsRead}
            className="text-gray-500 hover:text-blue-500"
          >
            <AiOutlineRead size={20} />
          </button>
        )}
        <button
          onClick={handleToggleFavorite}
          className="text-gray-500 hover:text-red-500"
        >
          {favoriteStatus ? (
            <AiFillHeart size={20} />
          ) : (
            <AiOutlineHeart size={20} />
          )}
        </button>
      </div>
      <div className="p-5 pt-12">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-yellow-50">
          {title}
        </h2>
        <p
          className="my-3 h-6 overflow-hidden text-ellipsis"
          dangerouslySetInnerHTML={{ __html: description }}
        />
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block text-blue-500 hover:underline"
        >
          Read more
        </a>
      </div>
    </div>
  );
};

export default ArticleCard;
