import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

export class CreateReportSupportDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsPhoneNumber("VN")
    @IsNotEmpty()
    phone: string;

    @IsString()
    @IsNotEmpty()
    familyName: string;

    @IsString()
    @IsNotEmpty()
    givenName: string;

    @IsString()
    @IsNotEmpty()
    message: string;
}
