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


  export function DeleteModel({id, group}: {id: string, group: 'author' | 'book'}) {
    const { token } = useUserContext();
    const { toast } = useToast()
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const deleteData = async () => {
        setLoading(true)
        if(group === 'author') {
            const {result, error} = await deleteAuthor(token, id)
            if(error) {
                toast ({title: 'Delete action Failed' })
                return setOpen(false)
            }

            if(result) {
                toast ({title: 'Author deleted successfully' })
                navigate('/authors')
                return
            }
        }

        setLoading(false)

    }

    return (
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button variant="link">Delete-<span className="capitalize"> {group}</span></Button>
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
  