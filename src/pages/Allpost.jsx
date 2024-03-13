import { ConfigureService } from "../Appwrite/configure"
import { Container,Postcard } from "../components/Index"
import { useEffect,useState } from "react"
export default function Allpost() {
    const [posts,setposts]=useState([])
    useEffect(()=>{},[])
    ConfigureService.getPosts([]).then((posts)=>{
        if (posts) {
            setposts(posts.documents)
        }
    })
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
        {posts.map((post)=>{
            <div key={post.$id}>
                <Postcard post={post}/>
            </div>      })}
            </div>
      </Container>
    </div>
  )
}
