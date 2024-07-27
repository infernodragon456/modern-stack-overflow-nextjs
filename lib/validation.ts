import {z} from 'zod'

export const formSchema = z.object({
    title : z.string().min(20, 'Your question title must be atleast 20 characters long!').max(150),
    description : z.string().min(40, {message: 'Your question description should be atleast 40 characters long!'}),
    tags: z.array(z.string().min(1).max(15)).min(1, 'Add atleast 1 tag!').max(5)
  })

export const answerSchema = z.object({
    answer : z.string().min(20, 'Your answer must be atleast of 20 characters!')
})  