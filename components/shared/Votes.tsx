'use client'

import { downvoteQuestion, upvoteQuestion } from '@/lib/actions/question.action'
import { formatAndDivideNumber } from '@/lib/utils'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React from 'react'

interface Props {
    type: string,
    itemId : string,
    userId : string,
    upvotes: number,
    downvotes: number,
    hasUpvoted: boolean,
    hasDownvoted : boolean,
    hasSaved? : boolean
}

const Votes = ({type, itemId, userId, upvotes, downvotes, hasUpvoted, hasDownvoted, hasSaved} : Props) => {
    const path = usePathname()
    async function handleVote(vote:string) {
        if (!userId) {return}

        if (type === 'question') {
            if (vote === 'upvote') {
                await upvoteQuestion({userId: userId, questionId: JSON.parse(itemId) , hasdownVoted : hasDownvoted, hasupVoted : hasUpvoted, path})
            } else {
               await downvoteQuestion({userId: userId, questionId: itemId, hasdownVoted : hasDownvoted, hasupVoted : hasUpvoted, path})
            }
        } else if (type === 'answer') {
            
        }

        
    }

    async function handleSave() {
        
    }

  return (
    <div className='flex gap-5'>
        <div className='flex-center gap-2.5'>
            <div className='flex-center gap-1.5'>
                <Image src={hasUpvoted ? '/assets/icons/upvoted.svg' : '/assets/icons/upvote.svg'} width={18} height={18} alt='Upvote Button' className='cursor-pointer' onClick={() => handleVote('upvote')}></Image>
                <div className='flex-center backgroundlight700_dark400 min-w-[18px] rounded-sm p-1 '>
                    <p className='subtle-medium text-dark400_light900'>
                        {formatAndDivideNumber(upvotes ? upvotes : 0)}
                    </p>
                </div>
            </div>

            <div className='flex-center gap-1.5'>
                <Image src={hasDownvoted ? '/assets/icons/downvoted.svg' : '/assets/icons/downvote.svg'} width={18} height={18} alt='Downvote Button' className='cursor-pointer' onClick={() => handleVote('downvote')}></Image>
                <div className='flex-center backgroundlight700_dark400 min-w-[18px] rounded-sm p-1 '>
                    <p className='subtle-medium text-dark400_light900'>
                        {formatAndDivideNumber(downvotes ? downvotes : 0)}
                    </p>
                </div>
            </div>
        </div>
        <Image src={hasSaved ? '/assets/icons/star-filled.svg' : '/assets/icons/star-red.svg'} width={18} height={18} alt='Star Button' className='cursor-pointer' onClick={() => handleSave}></Image>
    </div>
  )
}

export default Votes