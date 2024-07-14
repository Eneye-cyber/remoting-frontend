import { BookCollection, BookResource, INewBook, IUpdateBook } from "@/types/types.index";
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
        if(value) {
          formData.append(key, value)
        }
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

export async function updateBook(
  {token, body, id}: {body: IUpdateBook, token: string, id: string}
): Promise<BookResource | null> {
  let result: BookResource | null = null;
  let error: string | null = null;
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
    const req: BookResource = await api.put(`/books/${id}`, body, headers)
    result = req
  } catch (e: any) {
    console.log(e)
    error = e?.message ?? 'Something went wrong'
    let errorMessage: string = error as string;
    throw new Error(errorMessage);
  }
  return result
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


