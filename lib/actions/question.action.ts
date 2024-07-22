'use server'

import QuestionModel from "@/database/question.model"
import { connectToDatabase } from "../mongoose"
import TagModel from "@/database/tag.model"
import { string } from "zod"
import { CreateQuestionParams, GetQuestionsParams } from "./shared.types"
import UserModel from "@/database/user.model"
import { revalidatePath } from "next/cache"

export async function getQuestions(params: GetQuestionsParams) {
    try {
        connectToDatabase()
        const questions = await QuestionModel.find({})
            .populate({path: 'tags', model : TagModel})
            .populate({path : 'author', model : UserModel})
            .sort({createdAt : -1})

        return {questions}    
    } catch (error) {
        console.log(error)
        throw(error)
    }
}

export async function createQuestion(params: CreateQuestionParams) {
    try {
        connectToDatabase()
        const {title, description, tags, author, path} = params
        const question = await QuestionModel.create({title, description, author})
        const tagDocuments = []
        // console.log(tags)
        for (const tag of tags) {
            // console.log(tag);
            const existingTag = await TagModel.findOneAndUpdate(
                { name: tag },
                { $setOnInsert: { name: tag }, $push: { questions: question._id } },
                { 
                    upsert: true, 
                    new: true,
                    collation: { locale: 'en', strength: 2 }
                }
            );
            tagDocuments.push(existingTag._id);
        }
        // console.log(tagDocuments)
        await QuestionModel.findByIdAndUpdate(question._id, {
            $push : {tags: { $each : tagDocuments}}
        })
        revalidatePath(path)
    } catch (error) {
        console.log('from server actions' + error)
    }
}
