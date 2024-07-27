'use server'

import {AnswerModel} from "@/database/answer.model"
import { connectToDatabase } from "../mongoose"
import { string } from "zod"
import { CreateAnswerParams, GetAnswersParams } from "./shared.types"
import UserModel from "@/database/user.model"
import { revalidatePath } from "next/cache"
import QuestionModel from "@/database/question.model"

export async function createAnswer(params: CreateAnswerParams) {
    try {
        connectToDatabase()
        const {question, answer, author, path} = params
        const newAnswer = await AnswerModel.create({question, answer, author})

        await QuestionModel.findByIdAndUpdate(question, {
            $push: {answers : newAnswer._id}
        })
        
        revalidatePath(path)
    } catch (error) {
        console.log('from answer server actions ' + error)
        throw error
    }
}

export async function getAllAnswers(params: GetAnswersParams) {
    try {
        connectToDatabase()
        const {questionId, sortBy, page, pageSize} = params
        const answers = await AnswerModel.find({question: questionId})
            .populate('author', 'id clerkId name picture')
            .sort({createdAt : -1})
        return answers
    } catch (error) {
        console.log('from answer server actions ' + error)
        throw error
    }
}