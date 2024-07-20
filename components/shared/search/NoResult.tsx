'use client'

import { Button } from '@/components/ui/button'
import { useTheme } from '@/context/ThemeProvider'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const NoResult = ({title, description, link, linkTitle} : {title: string, description: string, link: string, linkTitle: string}) => {
    const {mode, setMode} = useTheme()
  return (
    <div className='mt-10 flex w-full flex-col items-center justify-center'>
        <Image src={`/assets/images/${(mode === 'dark' ? 'dark' : 'light')}-illustration.png`} alt='light-bulb' width={270} height={200} className='block object-contain'></Image>
        <h2 className='h2-bold text-dark-200 dark:text-light-900 mt-8'>There&apos;s no {title} to show...</h2>
        <p className='text-dark500_light700 body-regular max-w-md my-3.5 text-center'>{description}</p>
        <Link href={link}>
            <Button className='paragraph-medium mt-5 min-h-[46px] rounded-lg bg-primary-500 px-4 py-3 text-light-900 hover:bg-primary-300 hover:text-light-700'>{linkTitle}</Button>
        </Link>
    </div>
  )
}

export default NoResult