import './index.css'

import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Footer from './components/Footer.tsx'
import Navbar from './components/Navbar.tsx'
import Error from './components/Error.tsx'
import EntryDetails from './components/EntryDetails.tsx'
import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './components/Home.tsx'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import NewEntry from './components/NewEntry.tsx'
import SignUp from './components/SignUp.tsx'
import Login from './components/Login.tsx'



const App = () => {

  return <div className="flex flex-col min-h-screen">
    <Navbar />
    <Outlet />
    <Footer />
  </div>

}

const router = createBrowserRouter([{
  path: "",
  element: <App />,
  children: [
    {
      path: "",
      element: <Home />
    },
    {
      path: "entry/:id",
      element: <EntryDetails />
    },
    {
      path: "new_entry",
      element: <NewEntry />
    },
    {
      path: "signup",
      element: <SignUp />
    },
    {
      path: "login",
      element: <Login />
    }
  ],
  errorElement: <Error />
}
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)


export default App;