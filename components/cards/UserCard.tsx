import React from 'react'
import { IUser } from '@/database/user.model'
import Link from 'next/link'
import Image from 'next/image'
import { getTopTags } from '@/lib/actions/tag.action'
import { Badge } from '../ui/badge'
import TagCard from './TagCard'

interface UserProps {
    _id: string,
    clerkId : string,
    picture: string,
    name: string,
    username : string
}

const UserCard = async ({user} : {user : UserProps}) => {
    const interactedTags = await getTopTags({userId : user._id})
  return (
    <Link href={`/profile/${user.clerkId}`} className='shadow-light100_darknone w-full max-xs:min-w-full xs:w-[260px]'>
        <article className='background-light900_dark200 light-border flex w-full flex-col items-center justify-center rounded-2xl border p-8'>
            <Image src={user.picture} alt='User Profile Picture' width={100} height={100} className='rounded-full'></Image>
            <div className='mt-4 text-center'>
                <h3 className='h3-semibold text-dark200_light900 line-clamp-1'>{user.name}</h3>
                <p className='body-regular text-dark500_light500 mt-2'>@{user.username}</p>

            </div>
            <div className='mt-5 '>
                {interactedTags.length > 0
                   ? <div className='flex items-center gap-2' >
                        {interactedTags.map((tag) => (
                            <TagCard _id={tag} key={tag} name={tag}></TagCard>
                        ))}
                   </div>
                   :  <Badge>
                        No tags yet
                   </Badge>
                }
            </div>
        </article>
    </Link> 
  )
}

export default UserCard