import Question from '@/components/forms/Question'
import { getUserByID } from '@/lib/actions/user.action'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'


const Ask = async () => {
  let {userId} = auth()
  
  if (!userId) redirect('/sign-in')
  // userId = 'clerk_abc123xyz789'
  const mongoUser = await getUserByID({userId})
  // console.log(mongoUser)  
  return (
    <div>
      <h1 className='h1-bold text-dark100_light900 '>Ask a Question</h1>
      <div  className='mt-9'>
        <Question mongoUserId = {JSON.stringify(mongoUser._id)} ></Question>
      </div>
    </div>
  )
}

export default Ask