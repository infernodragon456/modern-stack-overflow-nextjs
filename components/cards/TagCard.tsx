import React from 'react'

const TagCard = ({name} : {name: string}) => {
  return (
    <div className=' bg-light-400 bg-opacity-10 p-2 rounded-lg px-4'>
                    <p className='text-sm text-light-500 uppercase'>{name}</p>
    </div>
  )
}

export default TagCard