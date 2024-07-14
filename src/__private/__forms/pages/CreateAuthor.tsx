import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea";
import { useUserContext } from "@/context/AuthProvider"
import { Input } from "@/components/ui/input"
import { PostAuthorValidation } from "@/lib/validation"
import Loader from "@/components/shared/Loader"
import { useToast } from "@/components/ui/use-toast"
import { useCreateAuthor } from "@/lib/react-query/queriesAndMutations"
import { useEffect } from "react"


function CreateAuthor() {
  const { toast } = useToast()
  const { token } = useUserContext();
  const { mutateAsync: submitAuthor, isPending: isLoadingCreate} = useCreateAuthor()
  const navigate = useNavigate()
  // const { watch, setValue } = useForm();

  // 1. Define  form.
  const form = useForm<z.infer<typeof PostAuthorValidation>>({
    resolver: zodResolver(PostAuthorValidation),
    defaultValues: {
      first_name: '',
      last_name: '',
      slug: '',
      biography: ''
    },
  })

  
  const firstName = form.watch('first_name');
  const lastName = form.watch('last_name');



  useEffect(() => {
    const slug = `${firstName}-${lastName}`.toLowerCase().replace(/\s+/g, '-');
    const singleValue = !firstName ? lastName : firstName;

    (firstName && lastName) ? form.setValue('slug', slug) : form.setValue('slug', singleValue.toLowerCase());
  }, [firstName, lastName]);



  const imageRef = form.register("profile_image");

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof PostAuthorValidation>) => {
    const newAuthor = await submitAuthor({body: values, token: token})
    if(!newAuthor) {
      toast({ title: 'Pleade try again'})
    }
    
    navigate('/')
  }

  return (
    <Form {...form}>
      <div className="flex-center flex-col">

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Register new author</h2>

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
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Unique slug</FormLabel>
                <FormControl>
                  <Input type="text" disabled aria-disabled className="shad-input" {...field} />
                </FormControl>
                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="profile_image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cover image</FormLabel>
                <FormControl>
                  <Input type="file" className="shad-input" onChange={(e) => field.onChange(e?.target?.files?.[0] ?? [])}/>
                </FormControl>
                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />

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
              isLoadingCreate ? ( <div className="flex-center gap-2"> <Loader /> Loading...</div> ) : "Submit"
            }
          </Button>

        </form>

      </div>
    </Form>
  )
}

export default CreateAuthor