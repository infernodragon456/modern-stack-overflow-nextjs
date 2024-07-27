'use server'

import UserModel from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import { GetAllTagsParams, GetTopInteractedTagsParams } from "./shared.types";
import TagModel from "@/database/tag.model";

export async function getTopTags(params:GetTopInteractedTagsParams) {
    try {
        connectToDatabase()

        const {userId, limit = 3} = params
        
        const user = await UserModel.findById(userId)

        if(!user) throw new Error('User not found!')

        return ['tag1', 'tag2', 'tag3']    


    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function getAllTags(params:GetAllTagsParams) {
    try {
        connectToDatabase()

        const {page = 1, pageSize = 20, filter, searchQuery} = params

        const tags = await TagModel.find({})
            .sort({createdAt : -1})

        return {tags}    

    } catch (error) {
        console.log(error)
        throw error
    }
}
