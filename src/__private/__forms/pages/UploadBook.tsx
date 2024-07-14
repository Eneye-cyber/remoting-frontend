import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea";
import { useUserContext } from "@/context/AuthProvider"
import { Input } from "@/components/ui/input"
import { PostBookValidation } from "@/lib/validation"
import Loader from "@/components/shared/Loader"
import { useToast } from "@/components/ui/use-toast"
import { useGetAuthor, useCreateBook } from "@/lib/react-query/queriesAndMutations"
import { Status } from "@/types/types.index"
import { getCurrentDate } from "@/lib/utils"


function UploadBook() {
  const { toast } = useToast()
  const { token } = useUserContext();

  const navigate = useNavigate()

  const { data: authors, isPending: isLoading} = useGetAuthor(token)
  const { mutateAsync: uploadBook, isPending: isLoadingCreate} = useCreateBook()

  const maxDate = getCurrentDate()


  const authorList = authors?.map(author => <SelectItem value={author.id}>{author.name}</SelectItem>)
  const statusList = Object.entries(Status).map(key => <SelectItem value={key[1]}>{key[0]}</SelectItem>)

      // 1. Define your form.
  const form = useForm<z.infer<typeof PostBookValidation>>({
    resolver: zodResolver(PostBookValidation),
    defaultValues: {
      status: Status['UNAVAILABLE'],
      author_id: '',
    },
  })


  const coverImageRef = form.register("cover_image");
  const bookFileRef = form.register("book_file");

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof PostBookValidation>) => {
    const newPost = await uploadBook({body: values, token: token})
    if(!newPost) {
      toast({ title: 'Pleade try again'})
    }
    console.log(newPost)
    navigate('/')
  }

  return (
    <Form {...form}>
      <div className="flex-center flex-col">

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Upload a new book</h2>

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
            name="cover_image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cover image</FormLabel>
                <FormControl>
                  <Input type="file" className="shad-input " {...coverImageRef}/>
                </FormControl>
                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          

          <FormField
            control={form.control}
            name="book_file"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Book File (Optional)</FormLabel>
                <FormControl>
                  <Input type="file" className="shad-input " {...bookFileRef} />
                </FormControl>
                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select book status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {statusList}
                  </SelectContent>
                </Select>
                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="author_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Author</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue className="shad-input" placeholder="Select author" />
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
              isLoading ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...</div>
              ): "Submit"
            }
          </Button>

        </form>

      </div>
    </Form>
  )
}

export default UploadBook