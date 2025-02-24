import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./schemas/user.schema";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/request/create-user.dto";
import { randomBytes } from "crypto";
import { CustomException } from "src/exception-handle/custom-exception";
import { ErrorCode } from "src/enums/error-code.enum";
import { UpdateUserDto } from "./dto/request/update-user.dto";


@Injectable()
export class UserRepository {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>
    ) { }

    async findByEmail(email: string) {
        return this.userModel.findOne({ user_email: email }).lean();
    }

    async createUser(dto: CreateUserDto) {
        return this.userModel.create({
            user_email: dto.email,
            user_name: dto.name,
            user_verified: dto.verified,
            user_avatar: dto.avatar,
            user_password: '',
            user_code: this.generateInviteCode(),
        });
    }

    async findById(id: string) {
        return this.userModel.findById(id).lean();
    }

    async findManyUserByIds(ids: string[]) {
        return this.userModel.find({ _id: { $in: ids } }).lean();
    }

    private generateInviteCode(): string {
        return randomBytes(3).toString('hex').toUpperCase(); // VD: "A1B2C3"
    }

    async addPartner(userId: string, partnerCode: string): Promise<User> {
        const user = await this.userModel.findById(userId);
        if (!user) throw new CustomException(ErrorCode.NOT_FOUND);

        const partner = await this.userModel.findOne({ user_code: partnerCode });
        if (!partner) throw new CustomException(ErrorCode.NOT_FOUND);

        if (user.your_partner || partner.your_partner) {
            throw new CustomException(ErrorCode.ALREADY_PARTNER);
        }

        // Cập nhật cả hai tài khoản để liên kết với nhau
        user.your_partner = partner._id;
        partner.your_partner = user._id;

        await user.save();
        await partner.save();

        return user;
    }

    async getPartner(userId: string) {
        const user = await this.userModel.findById(userId).populate('your_partner')
        .select('your_partner')
        .lean();
        return user;
    }

    async updateUser(userId: string, updateUserDto: UpdateUserDto) {
        return this.userModel.findByIdAndUpdate(userId,{
            ...updateUserDto,
            user_name: updateUserDto.name,
            user_avatar: updateUserDto.avatar,
        }, { new: true });
    }

}