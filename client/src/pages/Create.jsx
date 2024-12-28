import { useState } from "react";

const Create = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // const [file, setFile] = useState("");

  async function createNewBlog(event) {
    event.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("description", description);
    // data.set("file", file.length > 0 ? file[0] : null);

    try {
      const response = await fetch("http://localhost:4000/create", {
        method: "POST",
        body: data,
        credentials: "include",
      });
  
      if (!response.ok) {
        throw new Error("Failed to create the blog");
      }
  
      setTitle("");
      setDescription("");
      //setFile("");
      alert("Blog created successfully!");
    } catch (error) {
      console.error("Error creating blog:", error);
      alert("An error occurred. Please try again.");
    }
  }

  return (
    <div>
      <form action="" onSubmit={createNewBlog}>
        <div className="border-b border-gray-900/10 pb-12 space-y-6 mt-20">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-black">
            Create Blog
          </h2>
          {/* <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
            >
              <span>Upload a file</span>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
                onChange={(event) => setFile(event.target.files)}
              />
            </label>
          </div> */}
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-black outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6"
          />
          <textarea
            name="description"
            id="description"
            placeholder="Description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-black outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6"
          ></textarea>
          <button
            type="submit"
            className="bg-black text-white w-full rounded-md px-3 py-1.5 block focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          >
            Post the Blog
          </button>
        </div>
      </form>
    </div>
  );
};

export default Create;
