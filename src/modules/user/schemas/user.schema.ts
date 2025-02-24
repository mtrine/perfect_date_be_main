import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
import { UserSex } from "src/enums/user-sex.enum";
import { USER_ROLE } from "src/modules/databases/sample";


@Schema({
    timestamps: true,
})
export class User {
    @Prop({ required: true })
    user_email: string;

    @Prop({ required: true })
    user_name: string;

    @Prop({ default: null })
    user_avatar: string;

    @Prop({})
    user_password: string;

    @Prop({ default: false })
    user_verified: boolean;

    @Prop({ 
        default: null ,
        type:mongoose.Schema.Types.ObjectId,
        ref: User.name
    })
    your_partner: Types.ObjectId

    @Prop({
        required: true,
    })
    user_code: string;

    @Prop({ enum: UserSex, default: null })
    user_sex: string;

    @Prop({ default: null })
    user_birthdate: Date;

    @Prop({ required: true, ref: 'Role', default: USER_ROLE })
    user_role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);