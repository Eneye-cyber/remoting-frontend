import { BookCard } from "@/components/shared";
import Loader from "@/components/shared/Loader";
import { useUserContext } from "@/context/AuthProvider"
import { useGetBooks } from "@/lib/react-query/queriesAndMutations";

function Home() {
  const { token } = useUserContext();
  const {data: books, isError: error, isPending: isLoading} = useGetBooks(token)
  
  const cardLists = (books && !!books.length) ? books?.map((book, index) => (
    <BookCard key={index} book={book} />
  )) : 
    (<h2 className="text-center text-3xl mx-auto w-full col-span-2">
      {error ? 'Error fetching collection' : 'No Books Available'}
    </h2>)

  return (
    isLoading ? 
    (
      <section className="flex items-center justify-center h-screen w-full">
        <Loader />
      </section>
    ) : (
      <section className="w-full px-[5%] ">
          <div className="w-full max-w-screen-xl grid grid-cols-1 sm:grid-cols-2 gap-6 mx-auto my-20">
            {cardLists}
          </div>
      </section>

    )
  )
}

export default Home