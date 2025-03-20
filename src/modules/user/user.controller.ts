import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/request/create-user.dto';
import { ResponseMessage } from 'src/decorators/response-message.decorator';
import { User } from 'src/decorators/user-infor.decorator';
import { UserInterface } from './dto/response/user.interface';
import { UpdateUserDto } from './dto/request/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get('find-by-id/:id')
  @ResponseMessage('User found')
  findOne(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Post('request-partner')
  @ResponseMessage('Partner request sent')
  async requestPartner(@User() user: UserInterface, @Body('partnerCode') partnerCode: string) {
    return this.userService.requestPartner(user._id, partnerCode);
  }

  @Post('accept-partner')
  @ResponseMessage('Partner accepted')
  async acceptPartner(@User() user: UserInterface, @Body('partnerId') partnerId: string) {
    return this.userService.acceptPartner(user._id, partnerId);
  }

  @Post('reject-partner')
  @ResponseMessage('Partner rejected')
  async rejectPartner(@User() user: UserInterface, @Body('partnerId') partnerId: string) {
    return this.userService.rejectPartner(user._id, partnerId);
  }

  @Get("partner")
  @ResponseMessage('Partner found')
  async getPartner(@User() user: UserInterface) {
    return this.userService.getPartner(user._id);
  }

  @Patch("update-my-info")
  @ResponseMessage('User info updated')
  @UseInterceptors(FileInterceptor('file'))
  async updateMyInfo(@UploadedFile() file: Express.Multer.File, @User() user: UserInterface, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(user._id, file, updateUserDto);
  }

  @Get("get-my-info")
  @ResponseMessage('User info found')
  async getMyInfo(@User() user: UserInterface) {
    return this.userService.findById(user._id);
  }

  @Get("get-pedding-partner")
  @ResponseMessage('Pending partner found')
  async getPeddingPartner(@User() user: UserInterface) {
    return this.userService.getPenddingPartnerRequests(user._id);
  }
}
