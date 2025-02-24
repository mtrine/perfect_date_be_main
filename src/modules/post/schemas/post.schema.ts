import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
import { Plan } from "src/modules/plans/schemas/plan.schemas";
import { User } from "src/modules/user/schemas/user.schema";

@Schema({
    timestamps: true,
})
export class Post {

    @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: User.name })
    createdBy: Types.ObjectId;
    
    @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: Plan.name })
    planId: Types.ObjectId;

    @Prop({ required: true })
    content: string;

    
    @Prop({ required: true })
    title: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: User.name }], default: [] })
    likedBy: Types.ObjectId[];

    @Prop({ type: String ,default: ""})
    image: string;

    @Prop({
        required: true,
    })
    city: string;
     
}

export const PostSchema = SchemaFactory.createForClass(Post);
