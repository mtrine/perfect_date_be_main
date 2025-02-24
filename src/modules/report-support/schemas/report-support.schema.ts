import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
import { User } from "src/decorators/user-infor.decorator";

@Schema({
    timestamps: true,
})
export class ReportSupport {
    @Prop({ required: true })
    email:string;

    @Prop({ required: true })
    phone:string;

    @Prop({ required: true })
    familyName: string;

    @Prop({ required: true })
    givenName: string;

    @Prop({ required: true })
    message: string;

}

export const ReportSupportSchema = SchemaFactory.createForClass(ReportSupport);
