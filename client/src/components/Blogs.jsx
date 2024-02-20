import React, { useContext } from 'react'
import { context } from '@/context/context'
import { Accordion } from "@/components/ui/accordion"
import AccordionData from './AccordionData'

export default function Blogs() {
  const { blogs } = useContext(context)

  return (
    <div className='blogList w-full sm:w-1/2'>
      <Accordion collapsible type='single'>
        {blogs?.map(blog =><AccordionData key={blog.id} blog={blog}/>)}
      </Accordion>
    </div>
  )
}