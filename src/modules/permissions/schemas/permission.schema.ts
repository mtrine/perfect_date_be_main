import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true,
})
export class Permission {
    @Prop({
        required: true,
        unique: true,
    })
    permission_name: string;

    @Prop({
        required: true,
    })
    permission_apiPath: string;

    @Prop({
        required: true,
    })
    permission_method: string;

    @Prop({
        required: true,
    })
    permission_module: string;

}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
