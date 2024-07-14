import { Link, useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "@/context/AuthProvider"
import { useShowBook } from "@/lib/react-query/queriesAndMutations";
import { Group } from "@/types/types.index";
import { Button } from "@/components/ui/button"
import FileUploader from "@/components/shared/FileUploader";
import Loader from "@/components/shared/Loader";
import { DeleteModel } from "@/components/shared/DeleteModel";

function BookDetail() {
  const { token } = useUserContext();
  const { id } = useParams()
  const navigate = useNavigate()

  if(!id) navigate('/')

  const {data: book, isError: error, isPending: isLoading} = useShowBook(token, id ?? '')
  console.log(book, token)
  return (
    isLoading ? 
    (
      <section className="flex items-center justify-center h-screen w-full">
        <Loader />
      </section>
    ) : (
      (book && !error) ? (
        <article className="w-full px-[5%] py-10 md:py-20">
          <div className="w-full max-w-screen-xl mx-auto hidden md:flex justify-end">
            <DeleteModel id={id ?? ''} group="book" />
          </div>
          <div className="w-full max-w-screen-xl grid grid-cols-1 gap-y-6 sm:grid-cols-2 mx-auto bg-dark-3">
            <section className="md:h-[450px] text-center">
                <img src={book.cover_image} alt={book.title} className="h-full w-auto object-contain object-center mx-auto" loading="lazy" />
                <div className="md:hidden w-full py-4">
                  <DeleteModel id={id ?? ''} group="book" />
                </div>
            </section>
            <section className="py-8 px-4 flex flex-col">
              <header>
                <h2 className="h3-bold md:text-4xl md:text-medium">{book.title}</h2>
              </header>

              <main>
              <div className="py-6">
                <p><strong className="text-secondary-500 mr-2">Author: </strong> {book.author?.name}</p>
                <p><strong className="text-secondary-500 mr-2">Published: </strong> {book.published_at}</p>
                <p><strong className="text-secondary-500 mr-2">Status: </strong> <span className="opacity-70">{book.status}</span></p>
              </div>

              <p className=" text-gray-300 font-medium">Description</p>

              <div className="py-3 text-white opacity-60">
                {book.description}
              </div>
              </main>
              <hr className="my-4" />
              <footer className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 mt-auto">
              <FileUploader group={Group['BOOK']}>
                <Button className="rounded-none h-auto bg-secondary-500" variant="default">Edit Book Media</Button>
              </FileUploader>
                <Link to={`/forms/edit-book/${id}`} className="shad-button_primary inline-flex justify-center py-3">Edit Book Information </Link>
              </footer>
            </section>
          </div>
        </article>

      ) : (<h2 className="text-center text-3xl mx-auto w-full col-span-2">Error displaying book information</h2>)

    )
  )
}

export default BookDetail