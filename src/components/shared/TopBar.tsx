import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SearchIcon } from "lucide-react"

function TopBar() {
  return (
    <header className="bg-dark-1 w-full px-[5%] py-4">
      <div className="w-full max-w-screen-xl mx-auto flex justify-between items-center">
        <img src="/assets/images/logo.svg" className="h-full" alt="logo" />

        <form className="flex w-full max-w-sm items-center">
          <Input type="text" placeholder="Search" className="shad-input !h-8 md:!h-10" />
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

