import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {  Link, useNavigate } from 'react-router-dom'
import {Button, Input , Logo} from './Index'
import authService from '../Appwrite/auth'
import {useForm} from 'react-hook-form'
import { Login as AuthLogin } from '../store/AuthSlice'  /* this syntax means that login is termed as authlogin both are same function just renamed */
export default function Login() {
     const dispatch= useDispatch()
     const navigate = useNavigate()
     const {register,handlesubmit} = useForm()
     const [error,Seterror]=useState("")
     
     const login = async (data) =>{
        Seterror("")
        try {
            const session= await authService.Login(data)
            if (session) {
                const userdata= await authService.getCurrentUser()
                if(userdata) dispatch(AuthLogin(userdata));
                navigate("/")
            }
        } catch (error) {
            Seterror(error.message)
        }
     }
    return  (
        
        <div
        className='flex items-center justify-center w-full'
        >
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                        <span className="inline-block w-full max-w-[100px]">
                            <Logo width="100%" />
                        </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
            <p className="mt-2 text-center text-base text-black/60">
                        Don&apos;t have any account?&nbsp;
                        <Link
                            to="/signup"
                            className="font-medium text-primary transition-all duration-200 hover:underline"
                        >
                            Sign Up
                        </Link>
            </p>
            {error && <p className=' text-red-600 mt-8 text-center'>{error}</p>}

            <form onSubmit={handlesubmit(login)}
            className='mt-8'>
          <Input 
          label="Email : "
          type="email"
          placeholder='Enter your Email' 
           {...register("email", {
            required:true,
            validate:{
                matchPatern:(value)=>  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                "Email address must be a valid address",
            }
           }) }/>

           <Input
           label="Password : "
           type="password"
           placeholder="Enter your password"
            {...register("password",{
                required:true,
                minLength:8
            })}
           />
           <Button
           type='submit'
           className='w-full'>
            Sign In</Button>
            </form>
    </div>
    </div>
  )
}
