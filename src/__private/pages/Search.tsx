import Loader from '@/components/shared/Loader';
import { useUserContext } from '@/context/AuthProvider';
import { useSearch } from '@/lib/react-query/queriesAndMutations'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

function Search() {
    const { token } = useUserContext()
    const navigate = useNavigate()
    const query = useQuery();
    const searchTerm = query.get('query');
    if(!searchTerm) {
        navigate('/')
    }
    const {data: result, isError: error, isLoading: isLoading} = useSearch(token, searchTerm as string)

  return (
    isLoading ? 
    (
      <section className="flex items-center justify-center h-screen w-full">
        <Loader />
      </section>
    ) : (

        (error) ? (
          <h2 className="text-center text-3xl mx-auto w-full my-12">Error displaying search result</h2>
        ) : (
        <article className="w-full px-[5%] py-10 md:py-20 bg-dark-3">
          <div className="w-full max-w-screen-xl gap-y-6 mx-auto ">
            <h3>Book results: {result?.books.length ?? '0'}</h3>
            <div className="w-full mt-auto py-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {!!result?.books?.length ? (
                  result?.books.map((book, ind) => (
                    <Link to={`/books/${book.id}`} className="group rounded-md p-3 shadow-[rgba(135,126,255,_0.39)_0px_9px_20px]" key={ind}>
                    <figure className="flex items-center gap-4">
                        <img src={book.cover_image} className="w-16 h-16 rounded-full" alt={book.title} loading="lazy" />
                        <figcaption className="font-medium text-white font-inter tracking-wide">
                          <p className='line-clamp-2'>{ book.title }</p>
                          <div className="text-xs group-hover:underline text-primary-500 opacity-70">Author: {book.author.name}</div>
                        </figcaption>
                      </figure>
                    </Link>
                  ))
                ) : ''}
            </div>
            
            <hr className=' my-6 md:my-8'/>
            <h3>Author results: {result?.authors.length ?? '0'}</h3>
            <div className="w-full mt-auto py-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {!!result?.authors?.length ? (
                  result?.authors.map((author, ind) => (
                    <Link key={ind} to={`/authors/${author.id}`} className="group rounded-md p-3 shadow-[rgba(135,126,255,_0.39)_0px_9px_20px]">
                      <figure className="flex items-center gap-4">
                        <img src={author.avatar} className="w-16 h-16 rounded-full" alt="" loading="lazy" />
                        <figcaption className="font-medium text-white font-inter tracking-wide">
                          <p>{ author.name }</p>
                          <div className="text-xs group-hover:underline text-primary-500 opacity-70">View Author</div>
                        </figcaption>
                      </figure>
                    </Link>
                  ))
                ) : ''}
            </div>
          </div>
        </article>

        )
    )
  )
}

export default Search