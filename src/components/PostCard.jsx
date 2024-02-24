import React from 'react'
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'

function PostCard({$id, title, category, featuredImage}) {
          
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4'>
        <div className='  w-full justify-center'>
                <img src={appwriteService.previewFile(featuredImage)} alt={title}
                className='rounded-xl' />

            </div>
            <h2
            className='text-xl font-bold'
        >Title: {title}</h2>
        <h2
            className='text-xl font-bold'
            >Category: {category}</h2>
        </div>
    </Link>
  )
}


export default PostCard