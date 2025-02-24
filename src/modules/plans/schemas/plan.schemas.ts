import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, Types } from "mongoose";
import { User } from "src/modules/user/schemas/user.schema";

@Schema({
    timestamps: true,
})
export class Plan  {
    @Prop({ required: true })
    title: string;

    @Prop()
    description: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: User.name })
    createdBy: Types.ObjectId; // 🔥 Dùng Types.ObjectId

    @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: User.name })
    partnerId: Types.ObjectId; // 🔥 Dùng Types.ObjectId

    @Prop({ default: false })
    isPublic: boolean;

    @Prop({
        required: true,
    })
    startDate: Date;
}

export const PlanSchema = SchemaFactory.createForClass(Plan);
