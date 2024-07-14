import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useUserContext } from "@/context/AuthProvider";
import { useToast } from "../ui/use-toast";
import { Button } from "@/components/ui/button"
import Loader from "@/components/shared/Loader"
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { deleteAuthor } from "@/api/author"
import { deleteBook } from '@/api/book';


  export function DeleteModel({id, group}: {id: string, group: 'author' | 'book'}) {
    const { token } = useUserContext();
    const { toast } = useToast()
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleError = () => {
      toast ({title: 'Delete action Failed' })
      return setOpen(false)
    }

    const handleSuccess = (path: string) => {
      toast ({title: 'Model deleted successfully' })
      navigate(path)
    }

    const deleteData = async () => {
        setLoading(true)
        if(group === 'author') {
            const {result, error} = await deleteAuthor(token, id)

            if(error) return handleError()

            if(result) return handleSuccess('/authors')
        }

        if(group === 'book') {
          const {result, error} = await deleteBook(token, id)

          if(error) return handleError()

          if(result) return handleSuccess('/')
      }

        setLoading(false)

    }

    return (
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button className='text-red' variant="link">Delete-<span className="capitalize"> {group}</span></Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently remove this <span className="capitalize">{group}'s</span> data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button onClick={deleteData}>
                {
                (loading) ? (
                <div className="flex-center gap-2">
                    <Loader /> Loading...</div>
                ): "Confirm"
                }
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  