import { useState } from "react";
import { Link } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full h-16 md:h-20 flex items-center justify-between">
      <Link className="flex items-center gap-4 font-bold text-2xl">
        <img
          src="/Pnyx.png"
          className="w-8 h-8"
        />
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
          <Link href="">Home</Link>
          <Link href="">Create Job</Link>
          <Link href="">Share Latest</Link>
          <Link href="">
            <button className="py-2 px-4 rounded-xl bg-black text-white">
              Login
            </button>
          </Link>
        </div>
      </div>
      <div className="hidden md:flex items-center gap-8 xl:gap-12 font-medium">
        <Link href="">Home</Link>
        <Link href="">Create Job</Link>
        <Link href="">Share Latest</Link>
        <SignedOut>
          <Link href="/login">
            <button className="py-2 px-4 rounded-xl bg-black text-white">
              Login
            </button>
          </Link>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};

export default Navbar;
