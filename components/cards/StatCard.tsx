import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const StatCard = ({icon, value, title, textStyles, href, isAuthor}: {icon: string, value: number | string, title: string, textStyles? : string, href? : string, isAuthor? : boolean}) => {

    const Stats = (
        <>
                <Image src={icon} width={16} height={16} alt='icon' className={`object-contain ${href ? 'rounded-full invert-colors' : ''}`}></Image>
                <p className={`${textStyles} flex items-center gap-1`}>{value} 
                    <span className={`small-regular line-clamp-1 ${isAuthor ? 'max-sm:hidden' : ''}`}>
                        {title}
                    </span>
                </p>
        </>
    ) 
    if (href) {
        return (
            <Link href={href} className='flex-center gap-1'>
                {Stats}
            </Link>
        )
    }
  return (
    <div className='flex-center flex-1 gap-2'>
        {Stats}
    </div>
  )
}

export default StatCard