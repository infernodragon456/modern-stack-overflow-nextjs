import { IQuestion } from '@/database/question.model'
import { getQuestionByID } from '@/lib/actions/question.action'
import { Schema} from 'mongoose'
import { ObjectId } from 'mongoose'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import StatCard from '@/components/cards/StatCard'
import { formatAndDivideNumber, getTimeStamp } from '@/lib/utils'
import ParseHTML from '@/components/shared/ParseHTML'
import TagCard from '@/components/cards/TagCard'
import Answer from '@/components/forms/Answer'
import { auth } from '@clerk/nextjs/server'
import { getUserByID } from '@/lib/actions/user.action'
import AllAnswers from '@/components/shared/AllAnswers'
import Votes from '@/components/shared/Votes'

interface QuestionPost extends Omit<IQuestion, 'author' | 'tags'> {
    author : {
        _id : Schema.Types.ObjectId;
        clerkId : string;
        name: string;
        picture : string
    };
    tags : {
        _id : Schema.Types.ObjectId;
        name: string
    }[]
}

const QuestionPage = async ({params} : {params : any}) => {
    
    const question : QuestionPost = await getQuestionByID({questionId:  params.id})
    const {userId : clerkId} = auth()
    let mongoUser
    if (clerkId) {
        console.log(clerkId);
        mongoUser = await getUserByID({userId: clerkId})
        console.log("hi")

    }
    console.log("mongoUser",mongoUser);
    console.log(clerkId)
    
  return (
    <>
        <div className='flex w-full flex-col gap-5'>
            <div className='flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2'>
                <Link className='flex items-center justify-start gap-1' href={`/profile/${question.author.clerkId}`}>
                    <Image className='rounded-full' src={question.author.picture} alt='Author Picture' height={22} width={22}>
                    </Image>
                    <p className='paragraph-semibold text-dark300_light700'>{question.author.name} </p>
                </Link>
                <div className='flex justify-end'>
                    <Votes type='question' 
                    itemId={params.id} 
                    userId={JSON.stringify(mongoUser)} 
                    upvotes={question.upvotes.length} 
                    downvotes={question.downvotes.length} 
                    hasUpvoted={question.upvotes.includes(mongoUser)} 
                    hasDownvoted={question.downvotes.includes(mongoUser)} 
                    hasSaved={mongoUser?.saved.includes(question._id)} ></Votes>
                </div>
            </div>
            <h2 className='h2-semibold text-dark200_light900'>{question.title}</h2>
        </div>

        <div className='flex justify-start mb-8 mt-5 flex-wrap gap-4'>
            <StatCard icon={'/assets/icons/clock.svg'} value={''} title={`asked ${getTimeStamp(question.createdAt)}`} textStyles='small-medium text-dark400_light800'></StatCard>
            <StatCard icon='/assets/icons/message.svg' value={formatAndDivideNumber( question.answers.length)} title='Answers' textStyles='small-medium text-dark400_light800'></StatCard>
            <StatCard icon='/assets/icons/eye.svg' value={formatAndDivideNumber( question.views)} title='Views' textStyles='small-medium text-dark400_light800'></StatCard>
        </div>
        <ParseHTML data={question.description} ></ParseHTML>
        <div className='flex flex-wrap gap-3 mt-8'>
            {question.tags.map((tag) => (
                <TagCard _id={tag._id.toString()} name={tag.name} key={tag.name} ></TagCard>
            ))}
        </div>

        <AllAnswers questionId={params.id} author={mongoUser} totalAnswers = {question.answers.length}></AllAnswers>   
        <Answer questionId={params.id} author={mongoUser}></Answer> 
    </>
    
  )
}

export default QuestionPage