import { context } from '@/context/context'
import React, { useContext } from 'react'
import { Accordion } from "@/components/ui/accordion"
import AccordionData from './AccordionData'

export default function ReadingList() {
  const { user } = useContext(context)

  return (
    <div className='blogList w-full sm:w-1/2'>
      <Accordion collapsible type='single'>
        {user?.readings?.map(blog => <AccordionData key={blog.id} blog={blog}/>)}
      </Accordion>
    </div>
  )
}