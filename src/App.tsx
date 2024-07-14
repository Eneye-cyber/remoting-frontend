import { Routes, Route } from 'react-router-dom';
import AuthLayout from './__public/AuthLayout';
import { Login, Register } from '@/__public/pages';
import { Home, Authors, BookDetail, AuthorDetail, Search } from './__private/pages';
import RootLayout from './__private/RootLayout';
import { Toaster } from "@/components/ui/toaster"
import './globals.css'
import FormLayout from './__private/__forms/FormLayout';
import { CreateAuthor, EditAuthor, EditBook, UploadBook } from './__private/__forms/pages';

function App() {
  return (
    <main >
      <Routes>
        {/* Public routes v */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Route>
        {/* Private routes v */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />}></Route>
          <Route  path='/search' element={<Search />}></Route>
          <Route  path='/books' element={<Home />}></Route>
          <Route path='/books/:id' element={<BookDetail />}></Route>
          <Route path='/authors' element={<Authors />}></Route>
          <Route path='/authors/:id' element={<AuthorDetail />}></Route>
          <Route element={<FormLayout />}>
            <Route path='/forms/upload-book' element={<UploadBook />}></Route>
            <Route path='/forms/create-author' element={<CreateAuthor />}></Route>
            <Route path='/forms/edit-book/:id' element={<EditBook />}></Route>
            <Route path='/forms/edit-author/:id' element={<EditAuthor />}></Route>

          </Route>
        </Route>
      </Routes>

      <Toaster />
    </main>
  )
}

export default App