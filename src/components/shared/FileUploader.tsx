import { ReactNode, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useUserContext } from "@/context/AuthProvider";
import { useUploadFile } from "@/lib/react-query/queriesAndMutations";
import { UploadFileValidation } from "@/lib/validation";
import { Group } from "@/types/types.index";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "../ui/use-toast";
import Loader from "./Loader";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

function FileUploader({ group, children}: {group: Group, children: ReactNode}) {
    const { token } = useUserContext();
    const { id } = useParams()
    const [open, setOpen] = useState(false);
    const navigate = useNavigate()

  const { mutateAsync: submitFile, isError: updateError, isPending: isUpdating} = useUploadFile()

  // 1. Define  form.
  const form = useForm<z.infer<typeof UploadFileValidation>>({
    resolver: zodResolver(UploadFileValidation),
    defaultValues: {
      group: group,

    },
  })

   // 2. Define a submit handler.
   const onSubmit = async (values: z.infer<typeof UploadFileValidation>) => {
    const response = await submitFile({
        body: {...values, id: id ?? ''}, 
        token: token
    })
    console.log(response)
    if(!response || updateError) {
      return toast({ title: 'Please try again'})
    }

    navigate(0)
  }
    
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload file</DialogTitle>
          <DialogDescription>
            Make changes to media files here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <div className="flex-center flex-col">
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">

              {
                group === 'author' ? (
                  <FormField
                      control={form.control}
                      name="image"
                      render={({ field }) => (
                      <FormItem>
                          <FormLabel>Profile picture</FormLabel>
                          <FormControl>
                          <Input 
                              type="file" 
                              className="shad-input" 
                              onChange={(e) => field.onChange(e?.target?.files?.[0] ?? [])}
                          />
                          </FormControl>
                          <FormMessage className="shad-form_message" />
                      </FormItem>
                      )}
                  />
                ) : (
                  <>
                  <FormField
                      control={form.control}
                      name="image"
                      render={({ field }) => (
                      <FormItem>
                          <FormLabel>Cover Image</FormLabel>
                          <FormControl>
                          <Input 
                              type="file" 
                              className="shad-input" 
                              onChange={(e) => field.onChange(e?.target?.files?.[0] ?? [])} 
                          />
                          </FormControl>
                          <FormMessage className="shad-form_message" />
                      </FormItem>
                      )}
                  />

                  <FormField
                      control={form.control}
                      name="book"
                      render={({ field }) => (
                      <FormItem>
                          <FormLabel>Book</FormLabel>
                          <FormControl>
                          <Input 
                              type="file" 
                              className="shad-input" 
                              onChange={(e) => field.onChange(e?.target?.files?.[0] ?? [])} 
                          />
                          </FormControl>
                          <FormMessage className="shad-form_message" />
                      </FormItem>
                      )}
                    />
                  </>
                )
              }
            <DialogFooter>

              <Button type="submit" className="shad-button_primary">
                  {isUpdating ? (
                  <div className="flex-center gap-2">
                      <Loader /> Loading...
                  </div>
                  ) : (
                  "Save changes"
                  )}
              </Button>
            </DialogFooter>
            </form>
          </div>
        </Form>

      </DialogContent>
    </Dialog>
  )
}

export default FileUploader

