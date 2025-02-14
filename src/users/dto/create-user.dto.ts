import { UserRole } from '@prisma/client';

export class CreateUserDto {
  user_name: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  role: UserRole;
  email_verified: boolean;
}
