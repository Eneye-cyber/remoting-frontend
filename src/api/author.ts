import { AuthorCollection, AuthorResource, INewAuthor, INewBook, IUpdateAuthor, IUpdateBook } from "@/types/types.index";
import FetchWrapper from "./FetchWrapper";

export const API = 'http://localhost:8000/api'

  
export async function getAuthors(token: string) {
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
    const req: Array<AuthorCollection> = await api.get('/authors', headers)
    result = req
  } catch (e: any) {
    console.log(e)
    error = e?.message ?? 'Something went wrong'
    throw new Error(error)
  }
  return result
}

export async function showAuthor(token: string, id: string) {
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
    const req: AuthorResource = await api.get(`/authors/${id}`, headers)
    result = req
  } catch (e: any) {
    console.log(e)
    error = e?.message ?? 'Something went wrong'
    throw new Error(error)
  }
  return result
}

export async function postAuthor({body, token}: {body: INewAuthor, token: string}) {
  let result = null;
  let error = null;
  const author = body;
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

    const data: object = author
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const value = data[key as keyof typeof data]
        formData.append(key, value)
      }
    }

    const req: AuthorResource = await api.post(`/authors`, formData, headers)
    result = req;
  } catch (e: any) {
    console.log(e)
    error = e?.message ?? 'Something went wrong'
    throw new Error(error)
  }
  return result
}

export async function updateAuthor({body, token, id}: {body: IUpdateAuthor, token: string, id: string}) {
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
      'Content-type': 'application/json'
    }
    const req: AuthorResource = await api.put(`/authors/${id}`, body, headers)
    result = req;
  } catch (e: any) {
    console.log(e)
    error = e?.message ?? 'Something went wrong'
    throw new Error(error);
  }
  return result
}

export async function deleteAuthor(token: string, id: string) {
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
    result = await api.delete(`/authors/${id}`, headers)
  } catch (e: any) {
    console.log(e)
    error = e?.message ?? 'Something went wrong'
  }
  return {result, error}
}


