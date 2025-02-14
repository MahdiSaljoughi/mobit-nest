import { UserRole } from '@prisma/client';
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  user_name: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  role: UserRole;
  email_verified: boolean;
}
