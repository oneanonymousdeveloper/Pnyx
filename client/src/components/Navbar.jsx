import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((user) => {
        setUserInfo(user);
      });
    });
  }, [setUserInfo]);

  const name = userInfo?.name;

  function logout() {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  }

  return (
    <div className="w-full h-16 md:h-20 flex items-center justify-between">
      <Link className="flex items-center gap-4 font-bold text-2xl">
        <img src="/Pnyx.png" className="w-8 h-8" />
        <span>Pnyx</span>
      </Link>
      <div className="md:hidden">
        <div
          className="cursor-pointer text-3xl"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? "X" : "☰"}
        </div>
        <div
          className={`w-full h-screen flex flex-col items-center gap-8 font-medium text-lg justify-items-center absolute top-16 ${
            open ? "-right-0" : "-right-[100%]"
          } transition-all ease-in-out`}
        >
          {name && (
            <>
              <Link to="/">Home</Link>
              <Link to="/create">Share Latest</Link>
              <a  onClick={logout}>
                Logout
              </a>
            </>
          )}
          {!name && (
            <>
              <Link to="/login">
                <button className="py-2 px-4 rounded-xl bg-black text-white">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="py-2 px-4 rounded-xl bg-white text-black outline outline-1 -outline-offset-1 outline-black ">
                  Register
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
      <div className="hidden md:flex items-center gap-4 xl:gap-6 font-medium">
        {name && (
          <>
            <Link to="/">Home</Link>
            <Link to="/create">Share Latest</Link>
            <a  onClick={logout}>
              Logout
            </a>
          </>
        )}
        {!name && (
          <>
            <Link to="/login">
              <button className="py-2 px-4 rounded-xl bg-black text-white">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="py-2 px-4 rounded-xl bg-white text-black outline outline-1 -outline-offset-1 outline-black ">
                Register
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
