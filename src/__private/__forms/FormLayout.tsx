import { Outlet } from "react-router-dom"

function FormLayout() {
  return (
    <div className="flex w-full">
      <section className="w-full lg:w-1/2 py-10 px-3 xl:px-10 overflow-x-clip">
        <Outlet />
      </section>
      
      <img src="/assets/images/side-img.jpg" alt="logo" 
      className="hidden lg:block w-1/2 h-screen fixed top-0 right-0 -z-10 object-cover bg-no-repeat" />
    </div>
  )
}

export default FormLayout