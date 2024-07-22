'use client'
import React from 'react'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Filter from './Filter'
import { HomePageFilters, TagFilters } from '@/constants'
  



const LocalSearch = ({name} : {name: string}) => {


  return (
    <div className='flex flex-row gap-5 items-center relative w-full xl:flex-col'>
        <div className='background-light800_dark400 relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4 xl:w-full'>
            <Image src='/assets/icons/search.svg' alt='search' width={24} height={24} className='cursor-pointer'></Image>
            <Input type='text' placeholder={`Search for ${name}`} value='' className='mx-2 paragraph-regular no-focus placeholder background-light800_dark400 border-none shadow-none outline-none'></Input>
        </div>
        <Filter filters={HomePageFilters}/>
    </div>
  )
}

export default LocalSearch