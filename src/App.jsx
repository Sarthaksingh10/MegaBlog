import {useState,useEffect} from 'react'
import {useDispatch} from 'react-redux'
import authService from './Appwrite/auth'
import {Login,Logout} from './store/AuthSlice'
import { Header,Footer } from './components/Index'
import {Outlet} from 'react-router-dom'


function App() {
  const [loading,setLoading]= useState(true)
  const dispatch= useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(Login({userData}))
      } else {
        dispatch(Logout())
      }
    })
    .finally(() => setLoading(false))
  }, [dispatch])
  

 return loading ? (
 
  <div className='w-screen h-screen bg-gray-600 flex items-center justify-center'>
    <div className="h-full block">
  <Header/>
  <main>
    <Outlet/>
  </main>
 <Footer/>
  </div>
  </div>
 ): null
}

export default App
