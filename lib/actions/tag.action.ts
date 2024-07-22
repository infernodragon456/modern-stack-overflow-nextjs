'use server'

import UserModel from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import { GetTopInteractedTagsParams } from "./shared.types";

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