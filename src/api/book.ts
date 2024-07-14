import { BookCollection, BookResource, INewBook, INewUser, IUpdateBook } from "@/types/types.index";
import FetchWrapper from "./FetchWrapper";

export const API = 'http://localhost:8000/api'

  
export async function getBooks(token: string) {
  let result = null;
  let error = null;
  try {
    if(!token) {
        throw new Error('Unauthorized entry')
    }
    const api = new FetchWrapper();
    const headers = {
      'Accept': 'application/json',
      'Authorization': `bearer ${token}`
    }
    const req: Array<BookCollection> = await api.get('/books', headers)
    result = req
  } catch (e: any) {
    console.log(e)
    error = e?.message ?? 'Something went wrong'
    throw new Error(error)
  }
  return result
}

export async function showBook(token: string, id: string) {
  let result = null;
  let error = null;
  try {
    if(!token) {
      throw new Error('Unauthorized entry')
    }
    const api = new FetchWrapper();
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    }
    const req: BookResource = await api.get(`/books/${id}`, headers)
    result = req
  } catch (e: any) {
    console.log(e)
    error = e?.message ?? 'Something went wrong'
    throw new Error(error)
  }
  return result
}

export async function postBook({body, token}: {body: INewBook, token: string}) {
  let result = null;
  let error = null;
  const book = body;
  try {
    if(!token) {
      throw new Error('Unauthorized entry')
    }
    const api = new FetchWrapper();
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    }

    const formData = new FormData();

    const data: object = book
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const value = data[key as keyof typeof data]
        formData.append(key, value)
      }
    }

    const req: BookResource = await api.post(`/books`, formData, headers)
    result = req;
  } catch (e: any) {
    console.log(e)
    error = e?.message ?? 'Something went wrong'
    throw new Error(error)
  }
  return result
}

export async function updateBook(token: string, book: IUpdateBook) {
  let result = null;
  let error = null;
  try {
    if(!token) {
      throw new Error('Unauthorized entry')
    }
    const api = new FetchWrapper();
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
      "Content-Type": "application/json",
    }
    result = await api.put(`/books`, book, headers)
  } catch (e: any) {
    console.log(e)
    error = e?.message ?? 'Something went wrong'
  }
  return {result, error}
}

export async function deleteBook(token: string, id: string) {
  let result = null;
  let error = null;
  try {
    if(!token) {
      throw new Error('Unauthorized entry')
    }
    const api = new FetchWrapper();
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
    result = await api.delete(`/books/${id}`, headers)
  } catch (e: any) {
    console.log(e)
    error = e?.message ?? 'Something went wrong'
  }
  return {result, error}
}


