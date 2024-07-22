"use client"
import { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { formSchema } from "@/lib/validation"
import { Badge } from '../ui/badge';
import Image from 'next/image';
import { createQuestion } from '@/lib/actions/question.action';
import { usePathname, useRouter } from 'next/navigation';

const type : any = 'create'
const Question = ({mongoUserId} : {mongoUserId : string}) => {
    const editorRef = useRef(null);
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter()
    const pathname = usePathname()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          title: "",
          description: "",
          tags: []
        },
      })
    
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true)

        try {
            //make async call to backend to create question
            // console.log('submit: ' + values.tags)
            await createQuestion({
              title : values.title,
              description: values.description,
              tags: values.tags,
              author : JSON.parse(mongoUserId),
              path : pathname
            })
            //redirect to home
            router.push('/')
        } catch (error) {
            console.log('from QuestionComponent' + error)
        } finally {
            setIsSubmitting(false)
        }
    }
    function handleKeyDown(e : React.KeyboardEvent<HTMLInputElement>, field : any ) {
        if (e.key === 'Enter' && field.name === 'tags') {
            e.preventDefault();
            const tagInput = e.target as HTMLInputElement
            const tagValue = tagInput.value.trim()
            // console.log('handleKeyDown: ' + tagValue)
            if (tagValue !== '') {
                if (tagValue.length > 15 ) {
                    return form.setError('tags', {
                        type: 'required',
                        message: 'Tag must be less than 15 characters!'
                    })
                }
                if (!field.value.includes(tagValue as never)) {
                    form.setValue('tags', [...field.value, tagValue])
                    tagInput.value = ''
                    form.clearErrors('tags')
                }      
            } else {
                form.trigger()
            }
        }    
    }
    function handleTagRemove(tag : string, field : any) {
        if (field.name === 'tags' && field.value.includes(tag)) {
            const newTags = field.value.filter((t: string) => t !== tag)
            form.setValue('tags', newTags)
        }
    }


  return (
    <Form {...form} >
      <form  onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-10">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem  aria-required={true} className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">Question Title <span className="text-primary-500">*</span></FormLabel>
              <FormControl className="mt-3.5 ">
                <Input className="no-focus paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"  {...field} />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Enter your question. Be as brief as possible.
              </FormDescription>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem aria-required className="flex w-full flex-col gap-3">
              <FormLabel className="paragraph-semibold text-dark400_light800">Description <span className="text-primary-500">*</span></FormLabel>
              <FormControl>
              <Editor
                    onBlur={field.onBlur}
                    onEditorChange={(content) => field.onChange(content)}
                    apiKey= {process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                    onInit={(_evt, editor) => 
                        //@ts-ignore
                        editorRef.current = editor}
                    initialValue=""
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
                    content_style: 'body { font-family:Inter; font-size:12px }'
                    }}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Explain your query. Be as descriptive as possible.
              </FormDescription>
              <FormMessage className="text-red-400"/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem  aria-required={true} className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">Tags <span className="text-primary-500">*</span></FormLabel>
              <FormControl>
                <>
                <Input className="no-focus paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"  
                    placeholder="Type tags and press enter to add..."  
                    onKeyDown={(e) => handleKeyDown(e, field)}
                    />
                {field.value.length > 0 && (
                    <div className='flex-start mt-2.5 gap-2.5'>
                        {field.value.map((tag : any) => (
                            <Badge key={tag} className='font-inter subtle-medium background-light800_dark300 text-light400_dark500 flex items-center justify-center gap-2 rounded-md border-none px-4 py-2 uppercase' onClick={() => handleTagRemove(tag, field)}>
                                {tag}
                                <Image src={'assets/icons/close.svg'} alt='Close Icon' width={12} height={12} className='cursor-pointer object-contain invert-0 dark:invert'></Image>
                            </Badge>
                        ))}
                    </div>
                )} 
                </>
                   
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Attach appropriate tags to your question (atleast 1, maximum 5).
              </FormDescription>
              <FormMessage className='text-red-400' />
            </FormItem>
          )}
        />
        <Button type="submit" className='primary-gradient w-fit !text-light-900' disabled={isSubmitting}>
            {isSubmitting
                ? (<>
                     {type === 'edit' ? 'Editing...' : 'Posting...'}  
                    </>)
                : (<>
                    {type === 'edit' ? 'Edit Question' : 'Post Question'}
                    </>)   
            }
        </Button>
      </form>
    </Form>
  )
}

export default Question