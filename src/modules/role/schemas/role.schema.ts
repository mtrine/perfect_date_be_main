import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Permission } from "src/modules/permissions/schemas/permission.schema";


@Schema({
    timestamps: true,
})
export class Role {
    @Prop({
        required: true,
        unique: true,
    })
    role_name: string;

    @Prop({
        required: true,
    })
    role_description: string;

    @Prop({
        required: true,
        default: true,
    })
    role_isActive:boolean;

    @Prop({
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: Permission.name }], // Đảm bảo đúng kiểu dữ liệu
        required: true,
    })
    role_permissions: mongoose.Types.ObjectId[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);