import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { filter } from './HomeFilter'

const Filter = ({filters}: {filters : Array<filter>}) => {
  return (
    <Select>
            <SelectTrigger className=" w-[200px] justify-between text-dark-400 dark:text-light-700  bg-light-800 dark:bg-dark-200 dark:border-none text-sm">
                    <SelectValue placeholder="Select Filter" />
            </SelectTrigger>
            <SelectContent className="w-[200px] p-0 background-light800_dark300 dark:border-none">
                    {filters.map((filter) => (
                        <SelectItem className='text-dark-400 dark:text-light-700 hover:bg-light-700 dark:hover:bg-dark-400' value={filter.value} key={filter.value}>{filter.name}</SelectItem>
                    ))}
            </SelectContent>
    </Select>
  )
}

export default Filter