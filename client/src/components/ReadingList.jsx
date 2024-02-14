import { context } from '@/context/context'
import React, { useContext } from 'react'
import Blog from './Blog'
import { Button } from './ui/button'
import { BookmarkPlus, ExternalLink, Heart } from 'lucide-react'
import { DeleteButton } from './DeleteButton'
import propTypes from 'prop-types'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function ReadingList({ handleAddToReadingList, handleLike, handleRemove }) {
  const { user } = useContext(context)

  return (
    <div className='blogList w-full sm:w-1/2'>
        <Accordion collapsible type='single'>
        {user?.readings?.map(blog => 
          <AccordionItem key={blog.id} value={blog.id}>
            <AccordionTrigger className="hover:no-underline active:underline sm:hover:underline">
              <Blog blog={blog}/>
            </AccordionTrigger>
            <AccordionContent>
              <div>
                <div className='flex items-center justify-between w-full'>
                  <div className='flex gap-1'>
                    <Button variant="ghost" className="flex gap-1 min-w-[50px] w-fit p-2" onClick={() => handleLike(blog)}>
                      <Heart size={17} fill={`${user?.likes?.includes(blog.id) ? 'red' : 'transparent'}`} color={`${user?.likes?.includes(blog.id) ? 'red' : 'currentColor'}`}/>
                      <span>{blog.likes}</span>
                    </Button>
                    <Button variant="ghost" className="flex gap-1 w-fit p-2" asChild>
                      <a target='_blank' href={blog.url} rel="noreferrer"><ExternalLink size={17}/> Read</a>
                    </Button>
                    <Button variant="ghost" className="flex gap-1 w-fit p-2" onClick={() => handleAddToReadingList(blog)}>
                      <BookmarkPlus size={17} fill={`${user?.readings?.some(e => e.id === blog.id) ? '#FAF300' : 'transparent'}`} color={`${user?.readings?.some(e => e.id === blog.id) ? '#FAF300' : 'currentColor'}`}/>
                      <span>Save</span>
                    </Button>
                  </div>
                  {blog?.user?.username === user?.username 
                    && <DeleteButton className="" remove={handleRemove} id={blog.id}/> }
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        )}
        </Accordion>
      </div>
  )
}

ReadingList.propTypes = { 
  handleAddToReadingList: propTypes.func.isRequired, 
  handleLike: propTypes.func.isRequired, 
  handleRemove: propTypes.func.isRequired 
}