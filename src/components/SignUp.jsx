import {useState} from 'react'
import { useForm } from 'react-hook-form'
import {useDispatch} from 'react-redux'
import {useNavigate, Link} from 'react-router-dom'
import authService from '../Appwrite/auth'
import { Input,Button, Logo } from './Index'
import { Login } from '../store/AuthSlice'
function SignUp() {
    const dispatch =useDispatch()
    const navigate = useNavigate()
    const [error,SetError]=useState("")
    const {register,handleSubmit}= useForm()
    
    const signup= async(data)=>{
        SetError("")
        try {
            const userdata= await authService.createaccount(data)
            if (userdata) {
                const userData= await authService.getCurrentUser()
                if (userData) {
                    dispatch(Login(userData))
                }
                navigate("/")
            }
        } catch (error) {
            SetError(error.message)
        }
    }
    return (
    <div>
           <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
 {error && <p className=' text-red-900 mt-8 text-center'>{error}</p>}

 <form onSubmit={handleSubmit(signup)}
 >
    <div className='space-y-5'>
<Input
type="text"
placeholder="Enter your name"
label="Full Name : "
{...register("FullName",{
    required:true
})}/>
<Input
type="email"
placeholder="Enter you Email"
label="Email : "
{...register("email",{
    required:true,
    validate: (value)=> /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
    "Email address must be a valid address",
})}
/>
<Input
label="Password : "
type="password"
placeholder= "Enter password"
{...register("password",{
required:true,
minLength:8
})}
/>
<Button>Create Account</Button>
</div>
 </form>
      </div>
    </div>
  )
}

export default SignUp
