import Loader from "@/components/shared/Loader"
import { useUserContext } from "@/context/AuthProvider"
import { Outlet, Navigate } from "react-router-dom"

function AuthLayout() {
  const { isLoading, isAuthenticated } = useUserContext()

  if (isLoading) {
    return (
      <section className="flex items-center justify-center h-screen w-full">
        <Loader />
      </section>
    )
  }

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ): (
        <div className="flex h-dvh min-h-[496px]">
          <section className=" flex flex-1 justify-center items-center py-10">
            <Outlet />
          </section>
          <img src="/assets/images/side-img.jpg" alt="logo" className="hidden xl:block h-full w-1/2 object-cover bg-no-repeat" />
        </div>
      )}
    </>
  )
}

export default AuthLayout