'use server'

import UserModel from "@/database/user.model"
import { connectToDatabase } from "../mongoose"

export async function getUserByID(params:any) {
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