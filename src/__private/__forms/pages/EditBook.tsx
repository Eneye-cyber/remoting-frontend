import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Link, useNavigate, useParams } from "react-router-dom"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea";
import { useUserContext } from "@/context/AuthProvider"
import { Input } from "@/components/ui/input"
import { EditBookValidation } from "@/lib/validation"
import Loader from "@/components/shared/Loader"
import { useToast } from "@/components/ui/use-toast"
import { useShowBook, useGetAuthor, useUpdateBook } from "@/lib/react-query/queriesAndMutations"
import { getCurrentDate } from "@/lib/utils"
import { Status } from "@/types/types.index"
import { RadioGroupItem , RadioGroup} from "@/components/ui/radio-group"



function EditBook() {
  const { toast } = useToast()
  const { token } = useUserContext();
  const navigate = useNavigate()
  const { id } = useParams()


  const { data: authors} = useGetAuthor(token)
  const {data: book, isError: error, isPending: isLoading} = useShowBook(token, id ?? '')
  const { mutateAsync: submitBook, isError: updateError, isPending: isUpdating} = useUpdateBook()

  if(error) {
    toast({ title: 'Error retrieving book info'})
    navigate(-1)
  }

  // 1. Define  form.
  const form = useForm<z.infer<typeof EditBookValidation>>({
    resolver: zodResolver(EditBookValidation),
    defaultValues: {
      title: '',
      description: '',
      published_at: '',
      status: Status['UNAVAILABLE'],
      author_id: ''
    },
    mode: 'onChange',
    values: {
      title: book ? book.title : '',
      description: book ? book.description : '',
      published_at: book ? book.published_at : '',
      status: book ? book.status : Status['UNAVAILABLE'],
      author_id: book ? book.author.id  : ''
    },
  })



  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof EditBookValidation>) => {
    const updatedBook = await submitBook({body: values, token: token, id: id ?? ''})
    if(!updatedBook) {
      console.log('updateError', updateError)
      toast({ title: 'Please try again'})
      return
    }
    
    navigate(`/books/${updatedBook.id}`)
  }

  
  const maxDate = getCurrentDate()


  const authorList = authors?.map((author, ind) => (
  <SelectItem key={ind} aria-selected={author.id === book?.author?.id} value={author.id}>{author.name}</SelectItem>
  ))
  const statusList = Object.entries(Status).map(key => (
    <FormItem key={key[1]} className="flex items-center space-x-3 space-y-0">
      <FormControl>
        <RadioGroupItem value={key[1]} />
      </FormControl>
      <FormLabel className="font-normal">
        {key[0]}
      </FormLabel>
    </FormItem>
  ))

  return (
    <Form {...form}>
      <div className="flex-center flex-col">

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Edit Book Information</h2>

        {
          isLoading ? (
            <section className="flex items-center justify-center h-60 w-full">
              <Loader />
            </section>
          ) : (
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 lg:px-10 w-full mt-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input type="text" className="shad-input" {...field} />
                    </FormControl>
                    <FormMessage className="shad-form_message" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Book completion status</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-wrap space-x-3"
                      >
                        {statusList}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            <FormField
              control={form.control}
              name="author_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">Author</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue className="shad-input" placeholder={book?.author.name ?? "Select author"}>
                          {book?.author.name}
                        </SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {authorList}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    You can add authors to our collection{" "}
                    <Link className="text-primary-600" to="/forms/create-author">here</Link>.
                  </FormDescription>
                  <FormMessage className="shad-form_message" />
                </FormItem>
              )}
            />

            <div className="w-full space-y-2">
              <label htmlFor="published_at" className="text-sm font-medium leading-none shad-form_label">Publication date</label>
              <input type="date" max={maxDate} id="published_at" className="shad-input pl-3 w-full relative" {...form.register("published_at")} />
            </div>

            <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="shad-form_label">Book Description</FormLabel>
                    <FormControl>
                      <Textarea
                        className="shad-textarea custom-scrollbar"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="shad-form_message" />
                  </FormItem>
                )}
              />


              <Button type="submit" className="shad-button_primary">
                {
                  isUpdating ? (
                  <div className="flex-center gap-2">
                    <Loader /> Loading...</div>
                  ): "Submit"
                }
              </Button>

            </form>
          )
        }

      </div>
    </Form>
  )
}

export default EditBook