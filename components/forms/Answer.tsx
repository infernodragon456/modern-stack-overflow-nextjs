'use client'
import React, { useRef, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { Form, FormField , FormControl, FormLabel, FormItem, FormDescription, FormMessage} from '../ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { answerSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTheme } from '@/context/ThemeProvider';
import { Button } from '../ui/button';
import Image from 'next/image';
import { createAnswer } from '@/lib/actions/answer.action';
import { usePathname } from 'next/navigation';

const Answer = ({questionId, author} : {questionId: string, author : string}) => {

  const path = usePathname()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const editorRef = useRef(null)
  const {mode} = useTheme()
  const form = useForm<z.infer<typeof answerSchema>>({
    resolver: zodResolver(answerSchema),
    defaultValues: {
      answer: ''
    }
  })

  const handleCreateAnswer = async (values : z.infer<typeof answerSchema> ) => {
    setIsSubmitting(true)
     try {
        await createAnswer({
          answer : values.answer,
          question: questionId,
          author: author,
          path
        })

        form.reset()
        if (editorRef.current) {
          const editor = editorRef.current as any
          editor.setContent('')
        }

     } catch (error) {
      console.log(error)
      throw error
     } finally {
      setIsSubmitting(false)
     }
  }

  return (
    <div>
      <div className='flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2'>
        <h4 className='paragraph-semibold text-dark400_light800'>Write your answer here </h4>
        <Button className='btn-light-border-2 gap-1.5 rounded-md px-4 py-2.5 text-primary-500 shadow-none dark:text-primary-500' onClick={() => {}}>
          <Image src={'/assets/icons/stars.svg'} alt='star' width={12} height={12} className='object-contain'></Image>
          Generate an AI answer
        </Button>
      </div>
      <Form {...form}>
          <form className='mt-6 flex w-full flex-col gap-10' onSubmit={form.handleSubmit(handleCreateAnswer)}>
            <FormField
              control={form.control}
              name="answer"
              render={({ field }) => (
                <FormItem aria-required className="flex w-full flex-col gap-3">
                  <FormControl>
                  <Editor
                        onBlur={field.onBlur}
                        onEditorChange={(content) => field.onChange(content)}
                        apiKey= {process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                        onInit={(_evt, editor) => 
                            //@ts-ignore
                            editorRef.current = editor}
                        
                        init={{
                        height: 350,
                        menubar: false,
                        plugins: [
                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                            'anchor', 'searchreplace', 'visualblocks', 'codesample', 'fullscreen',
                            'insertdatetime', 'media', 'table', 'code', 'wordcount'
                        ],
                        toolbar: 'undo redo | blocks codesample | ' +
                            'bold italic forecolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ',
                        content_style: 'body { font-family:Inter; font-size:12px }',
                        skin: mode === 'dark' ? 'oxide-dark' : 'oxide',
                        content_css: mode === 'dark' ? 'dark' : 'light'
                        }}
                    />
                  </FormControl>
                  {/* <FormDescription className="body-regular mt-2.5 text-light-500">
                  Write your answer.
                  </FormDescription> */}
                  <FormMessage className="text-red-400"/>
                </FormItem>
              )}
            />
            <div className='flex justify-end'>
              <Button type='submit' className='primary-gradient w-fit text-white' disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
            </div>
          </form>
          
      </Form>
    </div>
    
  )
}

export default Answer