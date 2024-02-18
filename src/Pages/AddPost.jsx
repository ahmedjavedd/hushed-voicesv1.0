import React from 'react'
import { Container } from '../components'
import PostForm from '../components/post-form/Post-Form'


function AddPost() {
  return (
    <div className='py-8'>
        <Container>
            <PostForm />
        </Container>
    </div>
  )
}

export default AddPost