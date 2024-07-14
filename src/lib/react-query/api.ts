import { CurrentUser, INewUser, IUploadFile } from "@/types/types.index";
import { getCookie } from "../utils";
import FetchWrapper from "@/api/FetchWrapper";

export const API = 'http://localhost:8000/api'

  
export async function signInAccount(user: {email: string, password: string}) {
  let result = null;
  let error = null;
  let url = `${API}/login`
  try {
    let {email, password} = user;
    const formData = new FormData();
    formData.append('email', email)
    formData.append('password', password)
    const api = new FetchWrapper()

    const req = await api.post('/login', formData)
    result = req

    // if(req.status === 200 && req.statusText === "OK") {
    //   const res = await req.json();
    //   result = res.data
    // }

    // if(req.status !== 200 || req.statusText !== "OK") {
    //   const { message } = req.status === 401 ? await req.json() : 'Unable to Sign in';
    //   throw new Error(message);
    // }
  } catch (e: any) {
    console.log(e)
    error = e?.message ?? 'Unable to Sign In User'
  }
  return {result, error}
}


export async function getCurrentUser():Promise<CurrentUser | null> {
  let result = null
  const token = getCookie()
  if(!token) return result
  try {
    const api = new FetchWrapper();
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    }

    const req: CurrentUser = await api.get('/auth', headers)
    result = req
  } catch (error) {
    console.log(error)
  }
  return result
}


export async function createUserAccount({name, email, password, password_confirmation}: INewUser ) {
  let result = null;
  let error = null;
  let url = `${API}/register`

  try {
    const formData = new FormData();
    formData.append('name', name)
    formData.append('email', email)
    formData.append('password', password)
    formData.append('password_confirmation', password_confirmation)

    const req = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      },
      body: formData,
    })
    

    if(req.status === 200 && req.statusText === "OK") {
      const res = await req.json();
      result = res.data
    }

    if(req.status !== 200 || req.statusText !== "OK") {
      const status = req.status
      if(status === 400) {
        const { message } = await req?.json()
        let primero = JSON.parse(message)
        primero = Object.values(primero).shift()
        throw new Error(primero)
      }
      const { message } = status === 500 ? await req.json() :'Registration Failed';
      throw new Error(message);
    }
  } catch (e: any) {
    console.log(e)
    error = e?.message
  } 
  return {result, error};
}

export async function signOutAccount() {
  try {
    const session = null // await account.deleteSession("current");

    return session;
  } catch (error) {
    console.log(error);
  }
}

export async function uploadFile({body, token}: {body: IUploadFile, token: string}) {
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

    const formData = new FormData();

    const data: object = body
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const value = data[key as keyof typeof data]
        formData.append(key, value)
      }
    }

    const req = await api.post(`/upload`, formData, headers)
    result = req;
  } catch (e: any) {
    console.log(e)
    error = e?.message ?? 'Unable to Sign In User'
    throw new Error(error);
  }
  return result
  
}