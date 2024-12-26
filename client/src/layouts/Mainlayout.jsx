
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

const Mainlayout = () => {
  return (
    <div className='px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48 mx-5 md:mx-12 lg:mx-20 xl:mx-24 2xl:mx-30'>
      <Navbar/>
      <Outlet/>
    </div>
  )
}

export default Mainlayout
