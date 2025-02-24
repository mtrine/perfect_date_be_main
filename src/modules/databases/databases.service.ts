import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Role } from '../role/schemas/role.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../user/schemas/user.schema';
import { Permission } from '../permissions/schemas/permission.schema';
import { ConfigService } from '@nestjs/config';
import { config } from 'process';
import { ADMIN_ROLE, INIT_PERMISSIONS, USER_PERMISSION_IDS, USER_ROLE } from './sample';

@Injectable()
export class DatabasesService implements OnModuleInit {
    private readonly logger = new Logger(DatabasesService.name);
    constructor(
        @InjectModel(Role.name) private readonly roleModel: Model<Role>,
        @InjectModel(User.name) private readonly userModel: Model<User>,
        @InjectModel(Permission.name) private readonly permissionModel: Model<Permission>,
        private configService: ConfigService
    ) { }
    async onModuleInit() {
        const isInit = this.configService.get<string>('SHOULD_INIT');
        if (Boolean(isInit)) {

            const user = await this.userModel.findOne({ user_email: "admin@gmail.com" });
            const countRoles = await this.roleModel.countDocuments();
            const countPermissions = await this.permissionModel.countDocuments();

            if (countPermissions == 0) {
                await this.permissionModel.insertMany(INIT_PERMISSIONS)
            }
            if (countRoles == 0) {
                const permissions = await this.permissionModel.find({}).select('_id').lean();
                await this.roleModel.insertMany([
                    {
                        role_name: ADMIN_ROLE,
                        role_description: "Admin thì full quyền",
                        role_isActive: true,
                        role_permissions: permissions,
                    },
                    {
                        role_name: USER_ROLE,
                        role_description: "Người dùng hệ thống",
                        role_isActive: true,
                        role_permissions: USER_PERMISSION_IDS,
                    }
                ])
            }
            if (!user) {
                await this.userModel.insertMany([
                    {
                        user_email: "admin@gmail.com",
                        user_name: "I'm admin",
                        user_code: '123dsafad',
                        user_password: '200804',
                        user_role: ADMIN_ROLE
                    },
                    {
                        user_email: "example@example.com",
                        user_name: "I'm example user",
                        user_code: '123456fad',
                        user_password: '',
                        user_role: USER_ROLE
                    },
                ])
            }

            if ( countRoles > 0 && countPermissions > 0) {
                this.logger.log('>>> ALREADY INIT SAMPLE DATA...');
            }
        }
    }
}
