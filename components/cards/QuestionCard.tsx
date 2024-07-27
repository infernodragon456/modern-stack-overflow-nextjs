import React from 'react'
import {author, tag } from '@/app/(root)/(home)/page'
import Link from 'next/link'
import TagCard from './TagCard'
import StatCard from './StatCard'
import { formatAndDivideNumber, getTimeStamp } from '@/lib/utils'
import { Schema } from 'mongoose'
const QuestionCard = ({id, title, tags, author, upvotes, views, answers, createdAt} : {id: number, title: string, tags: Array<tag>, author: author, upvotes: Array<Schema.Types.ObjectId>, views: number, answers: Array<Schema.Types.ObjectId>, createdAt: Date}) => {
  return (
    <div className='card-wrapper p-9 sm:px-11 rounded-[10px] '>
        <div className='flex flex-col-reverse items-start justify-between gap-5 sm:flex-row'>
            <div>
                <span className='subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden'>{getTimeStamp(createdAt)}</span>
                <Link href={`/question/${id}`}>
                    <h3 className='sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1'>{title}</h3>
                </Link>
            </div>
        </div>
        <div className='mt-3.5 flex flex-wrap gap-2'>
            {tags.map((tag) => (
                <TagCard _id={tag._id} key={tag._id} name={tag.name}></TagCard>
            ))}
        </div>
        <div className='flex-between mt-6 w-full flex-wrap gap-3'>
            <StatCard icon={author.picture} value={( author.name)} title={`- ${getTimeStamp(createdAt)}`} textStyles='body-medium text-dark400_light700' isAuthor href={`/profile/${author._id}`}></StatCard>
            <StatCard icon='/assets/icons/like.svg' value={formatAndDivideNumber( upvotes.length)} title='Votes' textStyles='small-medium text-dark400_light800'></StatCard>
            <StatCard icon='/assets/icons/message.svg' value={formatAndDivideNumber( answers.length)} title='Answers' textStyles='small-medium text-dark400_light800'></StatCard>
            <StatCard icon='/assets/icons/eye.svg' value={formatAndDivideNumber( views)} title='Views' textStyles='small-medium text-dark400_light800'></StatCard>
            
        </div>
    </div>
  )
}

export default QuestionCard