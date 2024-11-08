import { getAllAnswers } from '@/lib/actions/answer.action'
import React from 'react'
import Filter from './search/Filter'
import { AnswerFilters } from '@/constants'
import Link from 'next/link'
import Image from 'next/image'
import { getTimeStamp } from '@/lib/utils'
import ParseHTML from './ParseHTML'
import Votes from './Votes'

const AllAnswers = async ({questionId, author, totalAnswers, page, filter} : {questionId : string, author: string, totalAnswers : number, page? : number, filter? : string}) => {
  const answers = await getAllAnswers({
    questionId,
    page: page ? +page : 1,
    sortBy: filter,
  })
  return (
    <div className='mt-11'>

      <div className='flex items-center justify-between'>
              <h3 className='primary-text-gradient'>{totalAnswers} Answers</h3>

              <Filter filters={AnswerFilters}></Filter>
      </div>

      <div>
        {answers.map((ans) => (
          <article key={ans._id} className='light-border border-b py-10'>
            <div className='flex items-center justify-between'>
              <div className='mb-8 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2'>
                <Link href={`/profile/${ans.author.clerkId}`} className='flex flex-1 items-start gap-1 sm:items-center'>
                  <Image src={ans.author.picture} width={18} height={18} alt='Answerer Profile' className='rounded-full object-cover max-sm:mt-0.5'></Image>
                  <div className='flex flex-col sm:flex-row sm:items-center'>
                    <p className='body-semibold text-dark300_light700'>
                      {ans.author.name}{' '}
                    </p>
                    <p className='small-regular text-dark400_light500 mt-0.5 line-clamp-1 ml-0.5'>
                      <span className='max-sm:hidden'>{' '} - </span>
                      answered {getTimeStamp(ans.createdAt)}
                    </p>
                  </div>
                </Link>
                <div className='flex justify-end'>
                  <Votes></Votes>
                </div>
              </div>
              
            </div>
            <div className='text-dark400_light700'>
              <ParseHTML data={ans.answer} ></ParseHTML>
            </div>
            
          </article>
        ))}
      </div>

    </div>
  )
}

export default AllAnswers