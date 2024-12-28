import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const SingleBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBlog() {
      try {
        const response = await fetch(`http://localhost:4000/${id}`, {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setBlog(data);
        } else {
          console.error("Failed to fetch blog");
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    }
    fetchBlog();
  }, [id]);

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:4000/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to delete blog");
      }

      alert("Blog deleted successfully");
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen">
    <div className="w-full max-w-4xl bg-white rounded-lg outline outline-1 outline-offset-1 outline-gray-500 p-6 mt-20">
      {blog ? (
        <div className="mt-4 flex flex-col gap-4">
          <h1  className="text-3xl font-bold text-gray-900 mb-4">{blog.title}</h1>
          <p className="text-gray-700 text-lg leading-relaxed border-t border-gray-200 pt-4">{blog.description}</p>
          <div className="flex gap-4 mt-6">
            <button onClick={handleEdit} className="px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg shadow-md transition duration-200">
              Edit Blog
            </button>
            <button onClick={handleDelete} className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg shadow-md transition duration-200">
              Delete Blog
            </button>
          </div>
        </div>
      ) : (
        <p>Loading blog details...</p>
      )}
    </div>
    </div>
  );
};

export default SingleBlog;
