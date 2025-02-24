import { Module } from '@nestjs/common';
import { DatabasesService } from './databases.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, RoleSchema } from '../role/schemas/role.schema';
import { User, UserSchema } from '../user/schemas/user.schema';
import { Permission, PermissionSchema } from '../permissions/schemas/permission.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Role.name,
        schema: RoleSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Permission.name,
        schema: PermissionSchema,
      },
    ])
  ],
  providers: [DatabasesService],
})
export class DatabasesModule { }
