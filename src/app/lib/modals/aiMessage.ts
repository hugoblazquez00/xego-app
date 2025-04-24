import { Schema, model, models } from "mongoose";

const AiMessageSchema = new Schema({
    idproject: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    sender: { type: String, enum: ['user', 'assistant'], required: true },
    content: { type: String, required: true },
    model: { type: String },        
    tokensUsed: { type: Number },    
    context: [{
        path: { type: String },
        content: { type: String }
    }]
}, { timestamps: true });

const AiMessage = models.AiMessage || model("AiMessage", AiMessageSchema, "aiMessages");

export default AiMessage; 