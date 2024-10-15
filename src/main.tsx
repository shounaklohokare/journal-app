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

const App = () => {

  return <div>
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
      path: ":id",
      element: <EntryDetails />
    }
  ],
  errorElement: <Error />
}
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)


export default App;