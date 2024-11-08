'use server'

// import {ObjectID} from 'bson'
import mongoose from "mongoose"
import QuestionModel from "@/database/question.model"
import { connectToDatabase } from "../mongoose"
import TagModel from "@/database/tag.model"
import { string } from "zod"
import { CreateQuestionParams, GetQuestionByIdParams, GetQuestionsParams, QuestionVoteParams } from "./shared.types"
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

export async function getQuestionByID(params: GetQuestionByIdParams) {
    try {
        connectToDatabase()
        const question = await QuestionModel.findById(params.questionId)
            .populate({path : 'tags', model: TagModel, select: '_id name'})
            .populate({path : 'author', model: UserModel, select: '_id clerkId name picture'})
        return question   
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

export async function upvoteQuestion(params:QuestionVoteParams) {
    try {
        connectToDatabase()
        const {questionId, userId, hasdownVoted, hasupVoted, path} = params
        let updateQuery : any = {};

        if (hasupVoted) {
            updateQuery = {$pull : {upvotes : userId}}
        } else if (hasdownVoted){
            updateQuery = {$push : {upvotes : userId}, $pull : {downvotes : userId}}
        } else {
            updateQuery = {$addToSet : {upvotes : userId}}
        }
        
        const question = await QuestionModel.findByIdAndUpdate(questionId , updateQuery, {new : true} )
        if (!question) {throw new Error('Question not found!')}

        revalidatePath(path)
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function downvoteQuestion(params:QuestionVoteParams) {
    try {
        connectToDatabase()
        const {questionId, userId, hasdownVoted, hasupVoted, path} = params
        let updateQuery : any = {};

        // if (hasdownVoted) {
        //     updateQuery = {$pull : {downvotes : userId}}
        // } else if (hasupVoted){
        //     updateQuery = {$push : {downvotes : userId}, $pull : {upvotes : userId}}
        // } else {
        //     updateQuery = {$addToSet : {downvotes : userId}}
        // }
        
        const obj_id = new mongoose.Types.ObjectId('66a32e35c0869a3abfdf8868')
        console.log(questionId)
        
        console.log( questionId.length)  
        let question = await QuestionModel.findById("66a32e35c0869a3abfdf8868")
        // const question = await QuestionModel.updateOne({_id : objectId} , updateQuery, {new : true} )
        if (!question) {throw new Error('Question not found!')}

        if (hasdownVoted) {
            // Remove userId from downvotes
            question.downvotes = question.downvotes.filter(id => !id.equals(userId));
          } else if (hasupVoted) {
            // Add userId to downvotes
            if (!question.downvotes.some(id  => id.equals(userId))) {
              question.downvotes.push(userId);
            }
            // Remove userId from upvotes
            question.upvotes = question.upvotes.filter(id => !id.equals(userId));
          } else {
            // Add userId to downvotes if not already present
            if (!question.downvotes.some(id => id.equals(userId))) {
              question.downvotes.push(userId);
            }
          }

        // Object.assign(question, updateQuery);
        // question = await question.save();
        
        console.log(question)

        revalidatePath(path)
    } catch (error) {
        console.log(error)
        throw error
    }
}
