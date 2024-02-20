import React, { useContext } from 'react'
import propTypes from 'prop-types'
import Blog from './Blog'
import { Button } from './ui/button'
import { BookmarkPlus, ExternalLink, Heart } from 'lucide-react'
import { DeleteButton } from './DeleteButton'
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { context } from '@/context/context'

export default function AccordionData({ blog }) {
  const { user, handleLike, handleAddToReadingList, handleRemove } = useContext(context)

  return (
    <AccordionItem value={blog.id}>
      <AccordionTrigger className="hover:no-underline active:underline sm:hover:underline">
        <Blog blog={blog}/>
      </AccordionTrigger>
      <AccordionContent>
        <div>
          <div className='flex items-center justify-between w-full'>
            <div className='flex gap-3'>
              <Button variant="ghost" className="flex gap-1 min-w-[45px] w-fit p-2" id="like" onClick={() => handleLike(blog)}>
                <Heart size={16} fill={`${user?.likes?.includes(blog.id) ? 'red' : 'transparent'}`} color={`${user?.likes?.includes(blog.id) ? 'red' : 'currentColor'}`} className='transition-colors mr-auto'/>
                <span>{blog.likes}</span>
              </Button>
              <Button variant="ghost" className="flex gap-1 w-fit p-2" asChild>
                <a target='_blank' href={blog.url} rel="noreferrer"><ExternalLink size={16}/> Read</a>
              </Button>
              <Button variant="ghost" className="flex gap-1 w-fit p-2" id="save" onClick={() => handleAddToReadingList(blog)}>
                <BookmarkPlus size={16} fill={`${user?.readings?.some(e => e.id === blog.id) ? '#FAF300' : 'transparent'}`} color={`${user?.readings?.some(e => e.id === blog.id) ? '#FAF300' : 'currentColor'}`} className='transition-colors'/>
                <span>Save</span>
              </Button>
            </div>
            {blog?.user?.username === user?.username 
              && <DeleteButton className="" remove={handleRemove} id={blog.id}/> }
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}

AccordionData.propTypes = {
  blog: propTypes.object.isRequired
}
