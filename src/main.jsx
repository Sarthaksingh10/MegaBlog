import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Provider} from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import { AuthLayout, Login, SignUp } from './components/Index.js'
import Allpost from './pages/Allpost.jsx'
import AddPost from './pages/AddPost.jsx'
import Editpost from './pages/Editpost.jsx'
import Post from './pages/Post.jsx'
const router =createBrowserRouter([{
  path:'/',
  element:<App/>,
  children:[
    {
      path:'/',
      element:<Home/>,
    },
    {
      path:'/login',
      element:(
        <AuthLayout authentication={false}>
          <Login/>
        </AuthLayout>
      )
    },
    {
      path:'/Signup',
      element:(
        <AuthLayout authentication={false}>
          <SignUp/>
        </AuthLayout>
      )
    },
    {
      path:'/all-posts',
      element:(
        <AuthLayout authentication>
          {""}
          <Allpost/>
        </AuthLayout>
      )
    },
    {
      path:'/add-posts',
      element:(
        <AuthLayout authentication>
          {""}
          <AddPost/>
        </AuthLayout>
      )
    },
    {
      path:'/edit-posts/:slug',
      element:(
        <AuthLayout authentication>
          {""}
          <Editpost/>
        </AuthLayout>
      )
    },
    {
      path:'/post/slug',
      element:<Post/>
    },
  ],
},])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
