import propTypes from 'prop-types'
import { ConfigureService } from '../Appwrite/configure'
import { Link } from 'react-router-dom'
export default function Postcard({$id , title, featuredImage}) {
  return (
<Link to={`/post/${$id}`}>
<div  className='w-full bg-gray-100 rounded-xl p-4'>
      <div className='w-full justify-center mb-4'>
        <img src={ConfigureService.getFilePreview(featuredImage)} alt={title}
         className='rounded-xl'/>

      </div>
      <h2 className='text-xl font-bold'>{title}</h2>
    </div>
    </Link>
  )
}

Postcard.propTypes={
    title:propTypes.any,
    featuredImage:propTypes.any,
    $id:propTypes.any
}
    
