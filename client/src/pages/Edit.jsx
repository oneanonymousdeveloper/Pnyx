import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Edit = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBlog() {
      try {
        const response = await fetch(`http://localhost:4000/${id}`, {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Blog not found");
        }

        const data = await response.json();
        setTitle(data.title);
        setDescription(data.description);
      } catch (err) {
        alert(err.message);
      }
    }

    fetchBlog();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:4000/edit/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to update blog");
      }

      alert("Blog updated successfully");
      navigate(`/${id}`);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <div className="border-b border-gray-900/10 pb-12 space-y-6 mt-20">
      <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-black">
            Edit Blog
          </h2>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-black outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
             className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-black outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6"
          />
        <button type="submit"  className="bg-black text-white w-full rounded-md px-3 py-1.5 block focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6">Save Changes</button>
      </div>
      </form>
    </div>
  );
};

export default Edit;
