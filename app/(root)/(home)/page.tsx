import QuestionCard from '@/components/cards/QuestionCard'
import LocalSearch from '@/components/shared/search/LocalSearch'
import NoResult from '@/components/shared/search/NoResult'
import { Button } from '@/components/ui/button'
import QuestionModel from '@/database/question.model'
import { getQuestions } from '@/lib/actions/question.action'
import Link from 'next/link'
import React from 'react'

export interface tag{
  _id: number,
  name: string
}
export interface author{
  _id: number,
  name: string,
  picture: string
}
interface question {
  _id: number,
  title: string,
  tags: Array<tag>,
  author: author
  upvotes: number,
  views: number,
  answers: number,
  createdAt: Date
}


const Home = async () => {

  const result = await getQuestions({})

  return (
    <>
      <div className='flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center'>
        <h1 className='h1-bold text-dark100_light900 max-sm:px-4'>All Questions</h1>

        <Link href={'/ask'} className='flex justify-end max-sm:w-full'>
          <Button className='primary-gradient min-h-[46px] px-4 py-3 !text-light-900'>
            Ask a Question
          </Button>
        </Link>
      </div>
      <div className='mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center'>
          <LocalSearch name='questions'></LocalSearch>
      </div>
      <div className='mt-10 flex w-full flex-col gap-6'>
            {result.questions.length >0  
              ? result.questions.map((question) => (
                <QuestionCard key={question._id} id = {question._id} title={question.title} tags={question.tags} author={question.author} upvotes={question.upvotes} views={question.views} answers={question.answers} createdAt={question.createdAt} ></QuestionCard>
              ))
              : <NoResult title='question' description='Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡' link='/ask' linkTitle='Ask a Question'></NoResult>}
      </div>
    </>
  )
}

export default Home