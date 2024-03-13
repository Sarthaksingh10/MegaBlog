import propTypes from 'prop-types'
import { useCallback,useEffect } from "react"
import { useForm } from "react-hook-form"
import { ConfigureService } from "../Appwrite/configure"
import {Button,Input, Select,RTE} from './Index'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
function Postform({post}) {
    const {register,handleSubmit,setValue,watch,control,getValues}= useForm({
        defaultValues:{
         title:post?.title || '',
         slug:post?.slug || '',
         content:post?.content || '',
         status:post?.status||'active'
        }
    })

    const navigate= useNavigate()
    const userdata= useSelector(state=>state.user.userdata)

    const submit = async (data)=>{
        if (post) {
          const file=  data.image[0]? ConfigureService.uploadfiles(data.image[0]):null
        if (file) {
            ConfigureService.DeleteFiles(post.featuredImage)
        }
        const dbpost=await ConfigureService.UpdatePost(file.$id,{
            ...data,
            featuredImage:file?file.$id:undefined,
        })
        if (dbpost) {
            navigate(`/post/${dbpost.$id}`)
        }
        }
        else{
            const file=  await ConfigureService.uploadfiles(data.image[0])
        
            if (file) {
                const fileid=file.$id
                data.featuredImage=fileid
                const dbpost=await ConfigureService.CreatePost({
                    ...data,
                    userid:userdata.$id
                })
                if (dbpost) {
                    navigate(`/post/${dbpost.$id}`)
                }
            } 
            
        }
        
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);
    useEffect(()=>{
const subscription= watch((value,{name})=>{
if (name==='title') {
    setValue('slug',slugTransform(value.title,{
        shouldValidate:true
    }))
}
})

return ()=>{
    subscription.unsubscribe()
}
    },[watch,setValue,slugTransform])
  return (
    <form onSubmit={handleSubmit(submit)} className='flex flex-wrap '>
            <div className='w-2/3 px-2'>
            <Input 
            label="Title : "
            placeholder="Your post title"
             className="mb-4"
             {...register("title",{
                required:true
             })}
             />
           <Input
           label="Slug : "
           placeholder="slug"
           className="mb-4"
           {...register("slug",{
            required:true
           })}
           onInput={(e)=>{
            setValue("slug",slugTransform(e.currentTarget.value),{
                shouldValidate:true
            })
           }}
           />
           <RTE label="content : " 
           name="content"
           control={control}
           defaultvalue={getValues("content")}/>
            </div>
            <div>
                <Input
                label="feature Image : "
                type='file'
                className="mb-4"
                accept='image/png, image/jpg, image/jpeg, image/gif '
                {...register("featuredImage",{
                    required:!post
                })}
                />
                <div className="w-full mb-4">
                    <img src={ConfigureService.getFilePreview(post.featuredImage)} alt={post.title}/>
                </div>
                <Select
                options={["active", "inactive"]}
                label="status"
                className="mb-4"
                {...register("selectstatus",{
                    required:true
                })}
                />
                <Button 
                type='Submit' bgColor={post? "bg-green-500" : undefined}
                className='w-full'>
                {post? "Update" : "Submit"}
            </Button>
            </div>
    </form>
  )
}

Postform.propTypes={
    post:propTypes.any,
}
export default Postform
