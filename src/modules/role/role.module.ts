import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, RoleSchema } from './schemas/role.schema';
import { RoleRepository } from './role.repo';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Role.name,
        schema: RoleSchema,
      },
    ])
  ],
  controllers: [RoleController],
  providers: [RoleService,RoleRepository],
  exports: [RoleRepository]
})
export class RoleModule {}
