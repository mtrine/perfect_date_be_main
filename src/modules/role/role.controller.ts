import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ResponseMessage } from 'src/decorators/response-message.decorator';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) { }

  @Post()
  @ResponseMessage("Role created successfully")
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Patch(':roleId/enable-permissions')
  @ResponseMessage("Enabled permissions successfully")
  enablePermissions(@Param('roleId') roleId: string, @Body("permissions") permissions: string[]) {
    return this.roleService.enablePermission(roleId, permissions);
  }

  @Patch(':roleId/disable-permissions')
  @ResponseMessage("Disabled permissions successfully")
  disablePermissions(@Param('roleId') roleId: string, @Body("permissions") permissions: string[]) {
    return this.roleService.disablePermission(roleId, permissions);
  }
}
