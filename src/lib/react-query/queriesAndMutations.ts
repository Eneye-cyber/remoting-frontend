import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query'
import { createUserAccount, signInAccount, signOutAccount, uploadFile } from './api'
import { INewBook, INewUser, INewAuthor, IUpdateAuthor, IUploadFile } from '@/types/types.index'
import { getBooks, postBook, showBook } from '@/api/book'
import { deleteAuthor, getAuthors, postAuthor, showAuthor, updateAuthor } from '@/api/author'

export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: (user: INewUser) => createUserAccount(user)
  })
}

export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (user: {email: string, password: string}) => signInAccount(user)
  })
}

export const useSignoutAccount = () => {
  return useMutation({
    mutationFn: signOutAccount
  })
}

// Books 

export const useGetBooks = (token: string) => {
  return useQuery({
    queryKey: ['getBooks', token],
    queryFn: () => getBooks(token),
    enabled: !!token,
  })
}

export const useShowBooks = (token: string, id: string) => {
  return useQuery({
    queryKey: ['getBook', id],
    queryFn: () => showBook(token, id),
    enabled: !!id,
  })
}

export const useCreateBook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post: {body: INewBook, token: string}) => postBook(post),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getBooks'],
      });
    },
  });
};

// Author 

export const useGetAuthor = (token: string) => {
  return useQuery({
    queryKey: ['getAuthors', token],
    queryFn: () => getAuthors(token),
    enabled: !!token,
  })
}

export const useShowAuthor = (token: string, id: string) => {
  return useQuery({
    queryKey: ['showAuthor', id],
    queryFn: () => showAuthor(token, id),
    enabled: !!id,
  })
}

export const useCreateAuthor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (author: {body: INewAuthor, token: string}) => postAuthor(author),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getAuthors'],
      });
    },
  });
};

export const useUpdateAuthor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (author: {body: IUpdateAuthor, token: string, id: string}) => updateAuthor(author),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['showAuthor'],
      });
    },
  });
};

export const useDeleteAuthor = (token: string, id: string) => {
  return useQuery({
    queryKey: ['deleteAuthor'],
    queryFn: () => deleteAuthor(token, id),
  })
}

export const useUploadFile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {body: IUploadFile, token: string}) => uploadFile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getAuthor', 'getBook'],
      });
    },
  });
};