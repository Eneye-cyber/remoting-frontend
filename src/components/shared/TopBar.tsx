import { useState } from 'react';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SearchIcon } from "lucide-react"
import { useNavigate } from 'react-router-dom';

function TopBar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: any) => {
    e.preventDefault()
    if (query.trim()) {
        navigate(`/search?query=${query}`);
    }
};
  return (
    <header className="bg-dark-1 w-full px-[5%] py-4">
      <div className="w-full max-w-screen-xl mx-auto flex justify-between items-center">
        <img src="/assets/images/logo.svg" className="h-full" alt="logo" />

        <form onSubmit={(e) => handleSearch(e)} className="flex w-full max-w-sm items-center">
          <Input type="text"  value={query} onChange={(e) => setQuery(e.target.value)} 
            className="shad-input !h-8 md:!h-10" placeholder="Search"
          />
          <div className="max-sm:hidden">
          <Button type="submit" size="icon" className="shad-button_primary">
            <SearchIcon className="w-3 h-3" />
          </Button>
          </div>
        </form>
      </div>
    </header>
  )
}

export default TopBar

