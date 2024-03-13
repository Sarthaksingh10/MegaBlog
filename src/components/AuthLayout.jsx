import propTypes from 'prop-types'
import { useEffect,useState } from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
function Protected({children,authentication=true}) {
   const [loader,Setloader]= useState(true)
   const navigate = useNavigate()

   const authstatus = useSelector(state=>state.auth.authstatus)

   useEffect(() => {
    if (authentication && authstatus !== authentication) {
        navigate("/login")
    }
    else if (!authentication && authstatus !==authentication){
        navigate("/")
    }
    Setloader(true)
   }, [authstatus,navigate,authentication])
   
    return loader? <h1>Loading...</h1> : <>{children}</>
}

Protected.propTypes={
  children:propTypes.any,
  authentication:propTypes.bool
}
export default Protected
