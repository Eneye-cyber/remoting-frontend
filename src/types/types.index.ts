import React from "react";

export type IContextType = {
    user: IUser;
    isLoading: boolean;
    setUser: React.Dispatch<React.SetStateAction<IUser>>;
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    token: string;
    setToken: React.Dispatch<React.SetStateAction<string>>;
    signOut: () => Promise<boolean>;
    checkAuthUser: () => Promise<boolean>;
    storeToken: (token: string | null, timeout?: number) => Promise<boolean>;

}

  export type INewBook = {
    title: string
    description: string
    published_at: Date | string
    cover_image: File
    book_file?: File | undefined
    status: Status
    author_id?: string | undefined
  };

  export type IUpdateBook = {
    title: string
    description: string
    published_at: string
    status: Status
    author_id?: string | undefined
  };
  
  export type INewAuthor = {
    first_name: string
    last_name: string
    slug: string
    profile_image: File
    biography: string
  };

  export type IUpdateAuthor = {
    first_name: string
    last_name: string
    biography: string
  };

  export type IUploadFile = {
    id: string
    group: Group
    image?: File
    book?: File
  };
  
  export type IUser = {
    id: string | number;
    name: string;
    email: string;
  };
  
  export type INewUser = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  };

  export type ICookie = {
    cookieFallback: string;
    cookieExpiry: string;
  };

  export enum Status {
    UNAVAILABLE = "Unavailable",
    COMPLETED = "Completed",
    INCOMPLETE = "Incomplete"
  }

  export enum Group {
    AUTHOR = "author",
    BOOK = "book",
  }

  export type Variant =  "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" 

// API Response

// User
export type CurrentUser = {
  token: string
  token_type: string
  expires_in: number
  user: User
}

export interface User {
  id: number
  name: string
  email: string
  email_verified_at: any
  created_at: string
  updated_at: string
}


// Response 
export type AuthorCollection = {
  id: string,
  name: string,
  avatar: string
}

export type BookCollection = {
  id: string,
  title: string,
  cover_image: string,
  author: AuthorCollection,
  status: Status,
}

export interface BookResource {
  id: string
  title: string
  description: string
  published_at: string
  cover_image: string
  book_file: string | null
  status: Status
  author: AuthorCollection
  created_at: string
  updated_at: string
}

export interface AuthorResource {
  id: string
  first_name: string
  last_name: string
  slug: string
  biography: string
  profile_image: string
  created_at: string
  updated_at: string
  books: BookResource[]
}
