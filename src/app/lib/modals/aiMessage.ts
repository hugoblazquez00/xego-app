
import { Schema, model, models } from "mongoose";
// const mongoose = require('mongoose');

const AiMessageSchema = new Schema({
    idproject: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    sender: { type: String, enum: ['user', 'gpt'], required: true },
    content: { type: String, required: true },
    model: { type: String },        
    tokensUsed: { type: Number },    
}, { timestamps: true });           

const AiMessage = models.AiMessage || model("AiMessage", AiMessageSchema, "aiMessages");

export default AiMessage; 