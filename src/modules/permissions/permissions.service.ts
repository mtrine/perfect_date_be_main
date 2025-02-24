import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PermissionRepository } from './permissions.repo';
import { CustomException } from 'src/exception-handle/custom-exception';
import { ErrorCode } from 'src/enums/error-code.enum';

@Injectable()
export class PermissionsService {
  constructor(
    private readonly permissionRepository: PermissionRepository
  ) {

  }

  async create(createPermissionDto: CreatePermissionDto) {
    const permission = await this.permissionRepository.createPermission(createPermissionDto);
    if (!permission) {
      throw new CustomException(ErrorCode.PERMISSION_IS_EXISTED);
    }
    return permission;
  }

  async findAll() {
    return this.permissionRepository.getPermissions();
  }
}
