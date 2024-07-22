'use client'
import React, { useEffect } from 'react'
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  



interface filter {
    name: string;
    value: string
}

const Filter = ({filters} : {filters : Array<filter>} ) => {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")
    const [windowDimensions, setWindowDimensions] = React.useState(0)
    const active = 'newest'

    useEffect(() => {
        setWindowDimensions(window.innerWidth)
        function handleResize() {
            setWindowDimensions(window.innerWidth);
          }
      
          window.addEventListener('resize', handleResize);
          return () => window.removeEventListener('resize', handleResize);
    },[])

    if (windowDimensions >= 1280) {
        return (
            <div className='flex flex-row w-full gap-5'>
                {filters.map((filter) => (
                    <div key={filter.value} className={` bg-opacity-10 p-3 rounded-lg px-8 ${active === filter.value ? 'bg-primary-500' : 'bg-light-400'}`}>
                        <p className={`text-sm  ${active === filter.value ? 'text-primary-500' : 'text-light-500'}`}>{filter.name}</p>
                    </div>
                ))}

            </div>
        )
    } else {
        return (
            <Select>
                <SelectTrigger className="w-[200px] justify-between text-dark-400 dark:text-light-700  bg-light-800 dark:bg-dark-200 dark:border-none text-sm">
                    <SelectValue placeholder="Select Filter" />
                </SelectTrigger>
                <SelectContent className="w-[200px] p-0 background-light800_dark300 dark:border-none">
                    {filters.map((filter) => (
                        <SelectItem className='text-dark-400 dark:text-light-700 hover:bg-light-700' value={filter.value} key={filter.value}>{filter.name}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
          )
    }
    
}

export default Filter