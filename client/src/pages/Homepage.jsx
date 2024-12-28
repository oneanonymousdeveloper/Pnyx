import { useEffect, useState } from "react";

const Homepage = () => {

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await fetch('http://localhost:4000/blogs',{
          credentials : 'include'
        })
        if(!response.ok){
          throw new Error('Failed to fetch the blogs');
        }
          const data = await response.json();
          setBlogs(data);
      } catch (error) {
        console.error('Error fetching the Blogs', error);
      }
    }
    fetchBlogs();
  }, [])
  return (
    <div className="mt-4 flex flex-col gap-4">
      <div className="flex gap-4">
        {blogs.map((blog) => (
          <div key={blog._id}>
            <h2>{blog.title}</h2>
            <p>{blog.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Homepage;
