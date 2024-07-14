import { useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "@/context/AuthProvider"
import { useShowBooks } from "@/lib/react-query/queriesAndMutations";
import Loader from "@/components/shared/Loader";

function BookDetail() {
  const { token } = useUserContext();
  const { id } = useParams()
  const navigate = useNavigate()

  if(!id) navigate('/')

  const {data: book, isError: error, isPending: isLoading} = useShowBooks(token, id ?? '')
  console.log(book, token)
  return (
    isLoading ? 
    (
      <section className="flex items-center justify-center h-screen w-full">
        <Loader />
      </section>
    ) : (
      (book && !error) ? (
        <article className="w-full px-[5%]">
          <div className="w-full max-w-screen-xl grid grid-cols-1 sm:grid-cols-2 mx-auto my-20 bg-dark-3">
            <section className="md:h-[450px] flex justify-center items-center">
                <img src={book.cover_image} alt={book.title} className="h-full w-auto object-contain object-center" loading="lazy" />
            </section>
            <section className="py-8 px-4 flex flex-col">
              <header>
                <h2 className="h3-bold md:text-4xl md:text-medium">{book.title}</h2>
              </header>

              <main>
              <div className="py-6">
                <p><strong className="text-secondary-500 mr-2">Author: </strong> {book.author?.name}</p>
                <p><strong className="text-secondary-500 mr-2">Published: </strong> {book.published_at}</p>
              </div>

              <p className=" text-gray-300 font-medium">Description</p>

              <div className="py-3 text-white opacity-60">
                {book.description}
              </div>
              </main>

              <footer className="w-full mt-auto">
                <a href="#" className="shad-button_primary inline-flex justify-center py-3">DOWNLOAD PDF VERSION </a>
              </footer>
            </section>
          </div>
        </article>

      ) : (<h2 className="text-center text-3xl mx-auto w-full col-span-2">Error displaying book information</h2>)

    )
  )
}

export default BookDetail