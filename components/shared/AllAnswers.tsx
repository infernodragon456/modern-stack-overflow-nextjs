import React from 'react'

const AllAnswers = ({questionId, author, totalAnswers, page, filter} : {questionId : string, author: string, totalAnswers : number, page? : number, filter? : string}) => {
  return (
    <div>{author}</div>
  )
}

export default AllAnswers