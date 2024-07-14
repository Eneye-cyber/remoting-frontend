import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Status, BookCollection } from "@/types/types.index"
import { Link } from "react-router-dom"


function BookCard({ book }: {book: BookCollection}) {
  const {
    id, title, cover_image, author, status
  } = book
  const getInitials = (fullName: string): string => {
    return fullName
        .split(' ') // Split the name by spaces
        .map(name => name.charAt(0).toUpperCase()) // Get the first letter of each part and convert it to uppercase
        .join(''); // Join the initials
  }
  const authorInitials = getInitials(author.name)
  return (
    <figure className="flex w-full gap-4 justify-between max-w-screen-sm bg-dark-3 px-3 py-4 rounded">
      <figcaption>
        <header aria-label={`${title}`} >
          <Link to={`/authors/${author.id}`} className="flex space-x-2 items-center">
          <Avatar className="h-5 w-5">
            <AvatarImage src={author.avatar} />
            <AvatarFallback className="text-[0.5rem] bg-light-4">{authorInitials}</AvatarFallback>
          </Avatar>
          
            <p className="text-xs tracking-wide">{author.name}</p>
          </Link>
        </header>

        <main aria-label={title} className="flex flex-col justify-between text-light-2 h-[100px]">
          <Link to={`/books/${id}`} className="hover:underline">
            <h2 className="h3-bold md:text-2xl font-medium line-clamp-2 leading-none">{title}</h2>
          </Link>

          <p className="text-sm text-light-2"><span className="font-bold">Status: </span> {status} </p>

        </main>
      </figcaption>
      <img src={cover_image} width="160" height="107" className="rounded max-h-32 object-cover object-center" loading="lazy" alt={title} />
    </figure>
  )
}

export default BookCard