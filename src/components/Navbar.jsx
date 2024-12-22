import { useState } from 'react';
import Image from './Image';

const Navbar = () => {
    const [open, setOpen] = useState(false);
  return (
    <div className='w-full h-16 md:h-20 flex items-center justify-between'>
      <div className='flex items-center gap-4 font-bold text-2xl'>
        <Image src='https://ik.imagekit.io/Abhinav0804/Pnyx.png?updatedAt=1734884327763' className='w-8 h-8' />
        <span>Pnyx</span>
        </div>
      <div className='md:hidden'> 
        <div className='cursor-pointer text-3xl' onClick={() => setOpen((prev) => !prev)}>{open ? 'X' : "☰"}</div>
        <div className={`w-full h-screen flex flex-col items-center gap-8 font-medium text-lg justify-items-center absolute top-16 ${ open ? '-right-0' : '-right-[100%]'} transition-all ease-in-out`}>
        <a href="">Home</a>
        <a href="">Trending</a>
        <a href="">Most Popular</a>
        <a href="">About Us</a>
        <a href=""><button className='py-2 px-4 rounded-xl bg-black text-white'>Login</button></a>
        </div>
      </div>
      <div className='hidden md:flex items-center gap-8 xl:gap-12 font-medium'>
        <a href="">Home</a>
        <a href="">Trending</a>
        <a href="">Most Popular</a>
        <a href="">About Us</a>
        <a href=""><button className='py-2 px-4 rounded-xl bg-black text-white'>Login</button></a>
      </div>
    </div>
  )
}

export default Navbar
