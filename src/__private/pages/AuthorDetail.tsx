import { Link, useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "@/context/AuthProvider"
import { useShowAuthor } from "@/lib/react-query/queriesAndMutations";
import Loader from "@/components/shared/Loader";
import { DeleteModel } from "@/components/shared/DeleteModel";
import FileUploader from "@/components/shared/FileUploader";
import { Group } from "@/types/types.index";
import { LucidePen } from "lucide-react";
import { Button } from "@/components/ui/button";

function BookDetail() {
  const { token } = useUserContext();
  const { id } = useParams()
  const navigate = useNavigate()

  if(!id || id === 'null') navigate('/')

  const {data: author, isError: error, isPending: isLoading} = useShowAuthor(token, id ?? '')
  
 

  const formatDate = (dateValue: string) => {
    const date = new Date(dateValue);

    const readableDate = date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      timeZoneName: 'short'
    });
    return readableDate
  }
  
  return (
    isLoading ? 
    (
      <section className="flex items-center justify-center h-screen w-full">
        <Loader />
      </section>
    ) : (
      (author && !error) ? (
        <article className="w-full px-[5%]">
          <div className="w-full max-w-screen-xl mx-auto bg-dark-3 py-12">
            <section className="flex justify-start max-md:flex-col items-start px-8">
              <aside className="w-full md:max-w-52 lg:max-w-80 mr-3 mt-2 text-center">
                <img src={author.profile_image} alt={author.slug} width="320px" height="320px" className="h-full w-auto object-contain object-center mb-4" loading="lazy" />

                <Link to={`/forms/edit-author/${id}`} className="underline small-regular text-secondary-500 flex-center gap-3  mb-3">
                  <LucidePen className="w-4 h-4" /> Edit Author Information
                </Link>
                <FileUploader group={Group['AUTHOR']}>
                  <Button variant="link">Change Profile Picture</Button>
                </FileUploader>
                <DeleteModel id={id ?? ''} group="author" />
              </aside>
    
              <main aria-label="author" className="py-8 md:px-4 flex flex-col w-full">
                <header className="mb-8">
                  <h2 className="h3-bold md:text-4xl md:text-medium">{author.last_name} {author.first_name}</h2>
                  <p className="body-medium text-primary-500 mt-4">Updated at: <span className="text-off-white ml-2">{ formatDate(author.updated_at) }</span></p>
                </header>
    
                <main aria-label="author main body" className="min-h-52">
                <p className=" text-gray-300 font-medium">Biography</p>
                <hr />
                <div className=" w-full py-6 px-2">
                  {author.biography}
                </div>
    
                </main>
                <p className="uppercase">{author.last_name} {author.first_name} books</p>
                <hr />
    
                <footer className="w-full mt-auto py-6 grid grid-cols-1 md:grid-cols-2">
                  {!!author.books?.length ? (
                    author.books.map((book, ind) => (
                      <Link to={`/books/${book.id}`} className="block group" key={ind}>
                        <figure  className="flex items-start gap-6 p-3">
                          <img src={book.cover_image} className="h-20 w-auto" width={'50px'} height={'64px'} alt={book.title} loading="lazy" />
                          <figcaption className="pt-1">
                            <h4 className="body-bold text-light-3 mb-2 group-hover:underline">{book.title}</h4>
                            <p className="text-xs text-light-2">Publication date: {book.published_at}</p>
                            <p className="text-xs text-light-2 opacity-75">Last updated: { formatDate(book.updated_at) }</p>
                          </figcaption>
                        </figure>
                      </Link>
                    ))
                  ) : ''}
                </footer>
              </main>
            </section>
          </div>
        </article>

      ) : (<h2 className="text-center text-3xl mx-auto w-full col-span-2">Error displaying author information</h2>)

    )

  )
}

export default BookDetail