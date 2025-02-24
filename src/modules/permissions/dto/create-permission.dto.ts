import { IsNotEmpty } from "class-validator";

export class CreatePermissionDto {
    @IsNotEmpty({ message: 'Permission name is required' })
    permission_name: string;

    @IsNotEmpty({ message: 'Permission apiPath is required' })
    permission_apiPath: string;

    @IsNotEmpty({ message: 'Permission method is required' })
    permission_method: string;

    @IsNotEmpty({ message: 'Permission module is required' })
    permission_module: string;
}
