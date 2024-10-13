import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Footer from './components/Footer.tsx'
import Navbar from './components/Navbar.tsx'
import Error from './components/Error.tsx'
import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './components/Home.tsx'

const App = () => {

  return <div>
    <Navbar />
    <Outlet />
    <Footer />
  </div>

}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

const router = createBrowserRouter([{
  path: "",
  element: <App />,
  children: [
    {
      path: "",
      element: <Home />
    }
  ],
  errorElement: <Error />
}
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)


export default App;
