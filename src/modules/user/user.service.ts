import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repo';
import { CreateUserDto } from './dto/request/create-user.dto';
import { User } from './schemas/user.schema';
import { UpdateUserDto } from './dto/request/update-user.dto';
import { UtilsService } from 'src/utils/utils.service';
import { UploadService } from '../upload/upload.service';
import { ErrorCode } from 'src/enums/error-code.enum';
import { CustomException } from 'src/exception-handle/custom-exception';
import { CacheHandleService } from '../cache-handle/cache-handle.service';
import { Types } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private uploadService: UploadService,
    private cacheHandleService: CacheHandleService
  ) { }

  async createUser(dto: CreateUserDto) {

    const user = await this.userRepository.createUser(dto);
    return user;
  }

  async findById(id: string) {
    const key = `user_${id}`;
    const cacheData = await this.cacheHandleService.getCache(key);
    if (cacheData) {
      return cacheData;
    }
    const user = await this.userRepository.findById(id);
    await this.cacheHandleService.setCache(`user_${id}`, user);
    return user;
  }

  async requestPartner(userId: string, partnerCode: string) {
    const user = await this.userRepository.findById(userId);
    const partner = await this.userRepository.findByCode(partnerCode);

    if (!user || !partner) {
      throw new CustomException(ErrorCode.NOT_FOUND);
    }

    if (user.your_partner || partner.your_partner) {
      throw new CustomException(ErrorCode.ALREADY_PARTNER);
    }
    
    // Kiểm tra xem đã gửi yêu cầu trước đó chưa
    if (partner.pending_partner_requests.map(id => id.toString()).includes(userId)) {
      throw new CustomException(ErrorCode.DUPLICATE_REQUEST);
    }

    // Thêm userId vào danh sách pending của partner
    await this.userRepository.update(partner._id.toString(), {
      $push: { pending_partner_requests: userId }
    });

    return { message: "Partner request sent" };
  }


  async acceptPartner(userId: string, partnerId: string) {
    const user = await this.userRepository.findById(userId);
    const partner = await this.userRepository.findById(partnerId);

    if (!user || !partner) {
      throw new CustomException(ErrorCode.NOT_FOUND);
    }

    // Kiểm tra xem có yêu cầu kết bạn từ partnerId không
    if (!user.pending_partner_requests.toString().includes(partnerId)) {
      throw new CustomException(ErrorCode.NOT_FOUND);
    }

    // Cập nhật đối tác cho cả hai
    await this.userRepository.update(userId, {
      your_partner: partnerId,
      $pull: { pending_partner_requests: partnerId }
    });

    await this.userRepository.update(partnerId, {
      your_partner: userId
    });

    return { message: "Partner request accepted" };
  }

  async getPartner(userId: string) {
    const partner = await this.userRepository.getPartner(userId);
    return partner;
  }

  async rejectPartner(userId: string, partnerId: string) {
    await this.userRepository.update(userId, {
      $pull: { pending_partner_requests: partnerId }
    });

    return { message: "Partner request rejected" };
  }


  async updateUser(userId: string, file: Express.Multer.File, updateUserDto: UpdateUserDto) {
    let user = await this.userRepository.findById(userId);
    if (!user) {
      throw new CustomException(ErrorCode.NOT_FOUND);
    }
    if (file) {
      // Upload ảnh mới
      const uploadResult = await this.uploadService.uploadFile(file, 'users');

      // Xóa ảnh cũ khỏi Cloudinary (nếu cần)
      if (user.user_avatar) {
        const publicId = this.extractPublicIdFromUrl(user.user_avatar);
        await this.uploadService.deleteFile(publicId, "users");
      }

      // Gán URL ảnh mới
      updateUserDto.user_avatar = uploadResult.secure_url;
    }
    const objectAfterRemove = UtilsService.removeUndefinedAndNull(updateUserDto) as UpdateUserDto;
    const userUpdate = await this.userRepository.updateUser(userId, objectAfterRemove);
    await this.cacheHandleService.delCache(`user_${userId}`);
    return userUpdate;
  }

  private extractPublicIdFromUrl(url: string): string {
    // Trích xuất public_id từ URL của Cloudinary
    const parts = url.split('/');
    const fileName = parts[parts.length - 1];
    return fileName.split('.')[0]; // Loại bỏ phần mở rộng (ví dụ: .jpg, .png)
  }

  async getPenddingPartnerRequests(userId: string) {
    const user = await this.userRepository.getPenddingPartnerRequests(userId);
    return user;
  }
}


