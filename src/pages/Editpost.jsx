import React from 'react'
import {useParams,useNavigate} from 'react-router-dom'
import { Container,Postform } from '../components/Index'
import { ConfigureService } from '../Appwrite/configure'
function Editpost() {
    const [post,setpost]= React.useState(null)
    const navigate= useNavigate()
    const {slug}=useParams

    React.useEffect(()=>{if (slug) {
        ConfigureService.getPosts(slug).then((post)=>{
            setpost(post)
        })
    }
else{
    navigate('/')
}},[slug,navigate])

  return post? (
    <div className='py-8'>
        <Container>
            <Postform post={post}/>
        </Container>
    </div>
  ):null
}

export default Editpost
