import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createUserAccount, search, signInAccount, signOutAccount, uploadFile } from './api'
import { INewBook, INewUser, INewAuthor, IUpdateAuthor, IUploadFile, IUpdateBook } from '@/types/types.index'
import { getBooks, postBook, showBook, updateBook } from '@/api/book'
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

export const useShowBook = (token: string, id: string) => {
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

export const useUpdateBook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (book: {body: IUpdateBook, token: string, id: string}) => updateBook(book),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getBook'],
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

// Misc
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

export const useSearch = (token: string, query: string) => {
  return useQuery({
    queryKey: [query],
    queryFn: () => search(token, query),
    enabled: !!query,
  })
}