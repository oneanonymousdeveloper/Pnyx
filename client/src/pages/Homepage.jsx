import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div className="mt-4 flex flex-col gap-4">
      <div className="flex gap-4">
        <Link to="/" className="underline underline-offset-2">Home</Link>
        <span className="underline underline-offset-2">Read Latest</span>
      </div>
    </div>
  );
};

export default Homepage;
