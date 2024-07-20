import LocalSearch from '@/components/shared/search/LocalSearch'
import NoResult from '@/components/shared/search/NoResult'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

interface tag{
  _id: number,
  name: string
}

interface question {
  _id: number,
  title: string,
  tags: Array<tag>,
  author: string
  upvotes: number,
  views: number,
  answers: number,
  createdAt: string
}

const questions : Array<question> = [
  // {
  //   _id: 1,
  //   title: 'Cascading Deletes in SQLAcademy',
  //   tags: [{_id: 1, name: 'python'}, {_id: 2, name: 'sql'}],
  //   author: 'John Doe',
  //   upvotes:10,
  //   views: 100,
  //   answers: 2,
  //   createdAt: '2023-09-01T12:00:00.000Z'
  // },
  // {
  //   _id: 2,
  //   title: 'Optimizing Django ORM Queries',
  //   tags: [{_id: 1, name: 'python'}, {_id: 3, name: 'django'}],
  //   author: 'Jane Smith',
  //   upvotes: 15,
  //   views: 150,
  //   answers: 3,
  //   createdAt: '2023-09-02T14:30:00.000Z'
  // },
  // {
  //   _id: 3,
  //   title: 'Understanding JavaScript Promises',
  //   tags: [{_id: 4, name: 'javascript'}, {_id: 5, name: 'async'}],
  //   author: 'Mike Johnson',
  //   upvotes: 20,
  //   views: 200,
  //   answers: 5,
  //   createdAt: '2023-09-03T09:15:00.000Z'
  // },
  // {
  //   _id: 4,
  //   title: 'Implementing RESTful APIs with Flask',
  //   tags: [{_id: 1, name: 'python'}, {_id: 6, name: 'flask'}, {_id: 7, name: 'api'}],
  //   author: 'Sarah Lee',
  //   upvotes: 12,
  //   views: 120,
  //   answers: 2,
  //   createdAt: '2023-09-04T16:45:00.000Z'
  // },
  // {
  //   _id: 5,
  //   title: 'Mastering CSS Grid Layout',
  //   tags: [{_id: 8, name: 'css'}, {_id: 9, name: 'frontend'}],
  //   author: 'Chris Brown',
  //   upvotes: 18,
  //   views: 180,
  //   answers: 4,
  //   createdAt: '2023-09-05T11:00:00.000Z'
  // },
  // {
  //   _id: 6,
  //   title: 'Effective Use of React Hooks',
  //   tags: [{_id: 10, name: 'react'}, {_id: 4, name: 'javascript'}],
  //   author: 'Emily Davis',
  //   upvotes: 25,
  //   views: 250,
  //   answers: 6,
  //   createdAt: '2023-09-06T13:20:00.000Z'
  // },
  // {
  //   _id: 7,
  //   title: 'Advanced PostgreSQL Indexing Techniques',
  //   tags: [{_id: 2, name: 'sql'}, {_id: 11, name: 'postgresql'}],
  //   author: 'Alex Wilson',
  //   upvotes: 22,
  //   views: 220,
  //   answers: 3,
  //   createdAt: '2023-09-07T10:30:00.000Z'
  // },
  // {
  //   _id: 8,
  //   title: 'Building Scalable Microservices with Node.js',
  //   tags: [{_id: 4, name: 'javascript'}, {_id: 12, name: 'nodejs'}, {_id: 13, name: 'microservices'}],
  //   author: 'David Thompson',
  //   upvotes: 30,
  //   views: 300,
  //   answers: 7,
  //   createdAt: '2023-09-08T15:10:00.000Z'
  // },
  // {
  //   _id: 9,
  //   title: 'Machine Learning with TensorFlow',
  //   tags: [{_id: 1, name: 'python'}, {_id: 14, name: 'machinelearning'}, {_id: 15, name: 'tensorflow'}],
  //   author: 'Lisa Chen',
  //   upvotes: 28,
  //   views: 280,
  //   answers: 5,
  //   createdAt: '2023-09-09T08:45:00.000Z'
  // },
  // {
  //   _id: 10,
  //   title: 'Securing Web Applications: Best Practices',
  //   tags: [{_id: 16, name: 'security'}, {_id: 17, name: 'webdev'}],
  //   author: 'Robert Taylor',
  //   upvotes: 35,
  //   views: 350,
  //   answers: 8,
  //   createdAt: '2023-09-10T12:55:00.000Z'
  // }
]

const Home = () => {
  return (
    <>
      <div className='flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center'>
        <h1 className='h1-bold text-dark100_light900'>All Questions</h1>

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
            {questions.length >0  
              ? questions.map((question) => (
                'QuestionCard'
              ))
              : <NoResult title='question' description='Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡' link='/ask' linkTitle='Ask a Question'></NoResult>}
      </div>
    </>
  )
}

export default Home