import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await fetch("http://localhost:4000/blogs", {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch the blogs");
        }
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching the Blogs", error);
      }
    }
    fetchBlogs();
  }, []);
  return (
    <div className="w-full mt-6  gap-6 justify-center p-6">
      <div className=" gap-4">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="w-full bg-white rounded-lg  p-6 outline outline-1 outline-offset-1 outline-gray-500 transition-shadow duration-200"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {blog.title}
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed mb-6">
              {blog.description}
            </p>
            <button
              onClick={() => navigate(`/${blog._id}`)}
              className="w-full py-2 px-4 text-center text-white bg-blue-500 hover:bg-blue-600 rounded-md font-medium shadow-sm transition-colors duration-200"
            >
              View Blog
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Homepage;
