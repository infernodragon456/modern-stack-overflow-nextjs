import { ITag } from '@/database/tag.model'
import React from 'react'

const TagPageCard = ({tag} : {tag : ITag}) => {
  return (
    <article className='background-light900_dark200 light-border flex w-full flex-col rounded-2xl border px-8 py-10 sm:w-[260px]'>
      <div className='background-light800_dark400 w-fit rounded-lg px-5 py-1.5'>
        <p className='paragraph-semibold text-dark300_light900'>{tag.name}</p>
      </div>
      <p className='small-medium text-dark400_light500 mt-3.5'>
        <span className='body-semibold mr-2.5 primary-text-gradient'>{tag.questions.length}+</span> Questions
      </p>
    </article>
  )
}

export default TagPageCard