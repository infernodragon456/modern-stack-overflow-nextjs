import TagCard from '@/components/cards/TagCard'
import Image from 'next/image'
import React from 'react'

const Right = () => {
  return (
    <section className='max-xl:hidden h-screen background-light900_dark200 light-border sticky border-l right-0 top-0 flex flex-col gap-12 p-6 pt-36 shadow-light-300 dark:shadow-none xl:w-[300px]'>
        <div className='flex flex-col justify-between gap-8 mb-2 text-dark-100 dark:text-light-700'>
            <h2 className='h2-semibold text-dark-100 dark:text-light-900'>Top Questions</h2>
            <div className='flex flex-row justify-between'>
                <p className='text-dark500_light700'>Question 1</p>
                <Image src='/assets/icons/chevron-right.svg' alt='link-arrow' width={20} height={20} className='invert-colors'></Image>
            </div>
            <div className='flex flex-row justify-between'>
                <p className='text-dark500_light700'>Question 1</p>
                <Image src='/assets/icons/chevron-right.svg' alt='link-arrow' width={20} height={20} className='invert-colors'></Image>
            </div>
            <div className='flex flex-row justify-between'>
                <p className='text-dark500_light700'>Question 1</p>
                <Image src='/assets/icons/chevron-right.svg' alt='link-arrow' width={20} height={20} className='invert-colors'></Image>
            </div>
            <div className='flex flex-row justify-between'>
                <p className='text-dark500_light700'>Question 1</p>
                <Image src='/assets/icons/chevron-right.svg' alt='link-arrow' width={20} height={20} className='invert-colors'></Image>
            </div>
        </div>
        <div className='flex flex-col justify-between gap-8 text-dark-100 dark:text-light-700'>
            <h2 className='h2-semibold text-dark-100 dark:text-light-900'>Popular Tags</h2>
            <div className='flex flex-row justify-between items-center'>
                <TagCard _id='' name='javascript'></TagCard>
                <p className='text-dark500_light700 text-sm'>4200+</p>
            </div>

        </div>
    </section>
  )
}

export default Right