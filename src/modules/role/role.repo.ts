import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { Role } from "./schemas/role.schema";
import { CustomException } from "src/exception-handle/custom-exception";
import { ErrorCode } from "src/enums/error-code.enum";
import { CreateRoleDto } from "./dto/create-role.dto";

@Injectable()
export class RoleRepository {
    constructor(
        @InjectModel(Role.name) private readonly roleModel: Model<Role>
    ) { }

    async createRole(dto: CreateRoleDto) {
        return this.roleModel.create({
            role_name: dto.role_name,
            role_description: dto.role_description,
            role_permissions: dto.role_permissions,
        });
    }
    
    async findOneByQuery(query: any) {
        return this.roleModel.findOne(query)
            .populate('role_permissions', 'permission_apiPath permission_method -_id')
            .lean();
    }

    async enablePermission(roleId: string, permissions: string[]) {
        const role = await this.roleModel.findByIdAndUpdate(roleId, {
            $addToSet: { role_permissions: { $each: permissions } }
        }, { new: true });
        return role;
    }

    async disablePermission(roleId: string, permissions: string[]) {
        const role = await this.roleModel.findByIdAndUpdate(roleId, {
            $pull: { role_permissions: { $in: permissions } }
        }, { new: true });
        return role;
    }
}