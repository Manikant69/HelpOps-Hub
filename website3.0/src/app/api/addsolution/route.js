import Questions from "@utils/models/question";  // Importing Mongoose model for blog collection
import mongoose from "mongoose";  // Importing Mongoose for MongoDB interactions
import { NextResponse } from "next/server";  // Importing Next.js server response utility


export async function POST(req) {
    try {
        // Parse JSON payload from request body
        const {ans,id,authorImage,authorName} = await req.json();

        const { MONGO_URI } = process.env;  
        
        // Connect to MongoDB using Mongoose
        await mongoose.connect(MONGO_URI);

        // Create a new instance of Blogs model with the received payload
        let blog = await Questions.findById(id)
        blog.solutions.push({ans:ans,authorImage:authorImage,authorName:authorName})
        // Save the new blog record to MongoDB
        const result = await Questions.findByIdAndUpdate(id,{
            $set:blog
        })
        // Return success response with saved blog details
        return NextResponse.json({ result, success: true });
    } catch (error) {
        console.error("Error in POST /api/blog:", error);
        return NextResponse.json({ success: false, error: error.message });
    }
}
