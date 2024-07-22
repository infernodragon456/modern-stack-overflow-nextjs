'use server'

import UserModel from "@/database/user.model"
import { connectToDatabase } from "../mongoose"
import { CreateUserParams, DeleteUserParams, GetAllUsersParams, GetUserByIdParams, UpdateUserParams } from "./shared.types"
import { revalidatePath } from "next/cache"
import { error } from "console"
import QuestionModel from "@/database/question.model"

export async function getUserByID(params:GetUserByIdParams) {
    try {
        connectToDatabase()
        const {userId} = params
        // console.log(userId)
        // let db = client.db("modern-stack-overflow");
        // let collection = await db.collection("users");
        const user = await UserModel.findOne({clerkId : userId})

        return user
    } catch (error) {
        console.log(error)
    }    
}

export async function createUser(userData:CreateUserParams) {
    try {

        connectToDatabase()
        console.log(userData)
        const newUser = await UserModel.create(userData)
        return newUser
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function updateUser(userData:UpdateUserParams) {
    try {
        connectToDatabase()
        const {clerkId, updateData, path} = userData
        await UserModel.findOneAndUpdate({clerkId : clerkId}, updateData, {
            new: true
        })
        revalidatePath(path)
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function deleteUser(userData:DeleteUserParams) {
    try {
        connectToDatabase()
        const {clerkId} = userData
        const user = await UserModel.findOneAndDelete({clerkId : clerkId})
        if (!user) {
            throw new Error('User not found')
        }
        //Delete user activity from database
        const userQuestions = await QuestionModel.find( {author : user._id}).distinct('_id')
        await QuestionModel.deleteMany({author : user._id})

        const deletedUser = await UserModel.findByIdAndDelete(user._id)
        return deletedUser
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function getUsers(params:GetAllUsersParams) {
    try {
        connectToDatabase()
        const {page = 1, pageSize = 20, filter, searchQuery} = params
        const users = await UserModel.find({})
            .sort({createdAt : -1})

        return {users}
    } catch (error) {
        console.log(error)
        throw error
    }
}