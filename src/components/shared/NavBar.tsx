import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useUserContext } from "@/context/AuthProvider";

type LinkPath  = {
  name: string;
  path: string;
};

function NavBar({links}: {links: Array<LinkPath>}) {
  const { signOut } = useUserContext()



  const listItems = links.map((links, index) => (
  <li key={`${links.name}${index}`} >
    <Link to={links.path} className="inline-flex px-5 text-sm py-3 hover:bg-primary-600 items-center justify-center cursor-pointer">
      {links.name}
    </Link>
  </li>
  ));
  return (
    <nav className="w-full px-[5%] bg-primary-500 text-light-1 font-inter">
      <ul className="w-full max-w-screen-xl mx-auto flex items-center justify-start">
        {listItems}
        <li className="ml-auto">
          <Button onClick={signOut} variant={'link'} className="inline-flex px-5 text-sm py-3 hover:bg-primary-600 items-center justify-center cursor-pointer">
            Sign Out
          </Button>

        </li>
      </ul>
    </nav>
  )
}

export default NavBar
