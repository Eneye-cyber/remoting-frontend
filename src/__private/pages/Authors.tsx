import Loader from "@/components/shared/Loader";
import { useUserContext } from "@/context/AuthProvider"
import { useGetAuthor } from "@/lib/react-query/queriesAndMutations";

function Authors() {
  const { token } = useUserContext();
  const {data: authors, isError: error, isPending: isLoading} = useGetAuthor(token)
  
  const authorList = (authors && !!authors.length) ? authors?.map((author, index) => (
    <a key={index} href={`/authors/${author.id}`} className="group rounded-md p-3 shadow-[rgba(135,126,255,_0.39)_0px_9px_20px]">
      <figure className="flex items-center gap-4">
        <img src={author.avatar} className="w-16 h-16 rounded-full" alt="" loading="lazy" />
        <figcaption className="font-medium text-white font-inter tracking-wide">
          <p>{ author.name }</p>
          <div className="text-xs group-hover:underline text-primary-500 opacity-70">View Author</div>
        </figcaption>
      </figure>
    </a>
  )) : (<h2 className="text-center text-3xl mx-auto w-full col-span-2">No Books Available</h2>)

  return (
    isLoading ? 
    (
      <section className="flex items-center justify-center h-screen w-full">
        <Loader />
      </section>
    ) : (
      (authors && !error) ? (
        <section className="w-full px-[5%] ">
         <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12 mx-auto text-center">Authors</h2>
          <div className="w-full max-w-screen-xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mx-auto mt-12 my-20">
            {authorList}
          </div>

        </section>

      ) : (<p>Something is up</p>)

    )

  )
}

export default Authors