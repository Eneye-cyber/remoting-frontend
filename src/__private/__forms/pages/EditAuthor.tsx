import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea";
import { useUserContext } from "@/context/AuthProvider"
import { Input } from "@/components/ui/input"
import { EditAuthorValidation } from "@/lib/validation"
import Loader from "@/components/shared/Loader"
import { useToast } from "@/components/ui/use-toast"
import { useShowAuthor, useUpdateAuthor } from "@/lib/react-query/queriesAndMutations"


function EditAuthor() {
  const { toast } = useToast()
  const { token } = useUserContext();
  const navigate = useNavigate()
  const { id } = useParams()
  
  if(!id) navigate('/')
  
  const {data: author, isError: error, isPending: isLoading} = useShowAuthor(token, id ?? '')
  const { mutateAsync: submitAuthor, isError: updateError, isPending: isUpdating} = useUpdateAuthor()

  // 1. Define  form.

  if(error) {
    toast({ title: 'Error retrieving author info'})
    navigate(-1)
  }

  const form = useForm<z.infer<typeof EditAuthorValidation>>({
    resolver: zodResolver(EditAuthorValidation),
    defaultValues: {
      first_name: '',
      last_name: '',
      biography: ''
    },
    mode: 'onChange',
    values: {
      first_name: author ? author.first_name : '',
      last_name: author ? author?.last_name : '',
      biography: author ? author?.biography : '',
    },
  })



  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof EditAuthorValidation>) => {
    const newAuthor = await submitAuthor({body: values, token: token, id: id ?? ''})
    if(!newAuthor || updateError) {
      toast({ title: 'Please try again'})
      return
    }
    
    navigate(`/authors/${newAuthor.id}`)
  }

  return (
    <Form {...form}>
      <div className="flex-center flex-col">

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Edit Author Information</h2>

        {
          isLoading ? (
            <section className="flex items-center justify-center h-60 w-full">
              <Loader />
            </section>
          ) : (
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 lg:px-10 w-full mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                
    
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First name</FormLabel>
                      <FormControl>
                        <Input type="text" className="shad-input" {...field} />
                      </FormControl>
                      <FormMessage className="shad-form_message" />
                    </FormItem>
                  )}
                />
    
                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last name</FormLabel>
                      <FormControl>
                        <Input type="text" className="shad-input" {...field} />
                      </FormControl>
                      <FormMessage className="shad-form_message" />
                    </FormItem>
                  )}
                />
              </div>
    
            <FormField
                control={form.control}
                name="biography"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="shad-form_label">Author Biography</FormLabel>
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
                  isUpdating ? ( <div className="flex-center gap-2"> <Loader /> Loading...</div> ) : "Submit"
                }
              </Button>
    
            </form>
          )
        }
        

      </div>
    </Form>
  )
}

export default EditAuthor