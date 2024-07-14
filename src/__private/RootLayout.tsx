import { NavBar, TopBar} from "@/components/shared"
import { Link, Navigate, Outlet } from "react-router-dom"
import { useUserContext } from "@/context/AuthProvider"
import { Plus, XIcon, UserPlus2Icon, BookOpenTextIcon } from "lucide-react"
import Loader from "@/components/shared/Loader"
import { useState } from "react"

function RootLayout() {
  const { isLoading, isAuthenticated } = useUserContext()
  const [btnVisible, setBtnVisible] = useState<boolean>(false);

  
  const navLinks = [
    {name: 'Home', path: '/'},
    {name: 'Authors', path: '/authors'},
    // {name: 'Profile', path: '/profile'}
  ]

  const toggleButtonVisibility = () => {
    setBtnVisible(prevState => !prevState);
  };

  if (isLoading) {
    return (
      <section className="flex items-center justify-center h-screen w-full">
        <Loader />
      </section>
    )
  }
  
  return (

    isAuthenticated ? 
    (
    <div className="w-full h-full">
      <TopBar />
      <NavBar links={navLinks} />
      <section className="flex flex-1 h-full"> 
        <Outlet /> 
      </section>

      <div className="fixed z-20 right-[3%] bottom-12 w-fit flex flex-col gap-4">
        <Link to="/forms/upload-book" className={
          `p-0 w-16 h-16 bg-primary-500 rounded-full hover:bg-primary-600 inline-flex flex-center active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none 
            ${btnVisible ? '' : 'translate-y-40 -z-20'}`
          }>
            <BookOpenTextIcon className="w-6 h-6 inline-block text-white" />
        </Link>
        <Link to="/forms/create-author" className={
          `p-0 w-16 h-16 bg-secondary-500 rounded-full hover:bg-primary-600 inline-flex flex-center active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none 
            ${btnVisible ? '' : 'translate-y-20 -z-10'}`
          }>
            <UserPlus2Icon className="w-6 h-6 inline-block text-white" />
        </Link>
            
        <button onClick={toggleButtonVisibility} 
          className="p-0 w-16 h-16 bg-red rounded-full hover:bg-primary-600 active:shadow-lg z-0 mouse shadow transition ease-in duration-200 focus:outline-none">
            {!btnVisible ? (<Plus className="w-6 h-6 inline-block text-white" />) : (<XIcon className="w-6 h-6 inline-block text-white" />)} 
        </button>

      </div>

      {/* <Bottombar></Bottombar> */}
    </div>
    ) : (
      <Navigate to="/sign-in" />
    )
  )
}

export default RootLayout