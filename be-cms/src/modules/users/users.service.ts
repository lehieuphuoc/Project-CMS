import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { AuthProvider, User } from './schemas/user.schema';
import { Model, Types } from 'mongoose';
import { hashPasswordHelper } from '@/helpers/util';

const DEFAULT_CUSTOMER_ROLE_ID = '68f73fcc03a49451f7d7730c';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  // kiểm tra email đã tồn tại chưa
  isEmailExist = async (email: string) => {
    const user = await this.userModel.exists({ email });
    if (user) return true;
    return false;
  };

  async create(createUserDto: CreateUserDto) {
    const { name, email, password, role } = createUserDto;
    // check email
    const isExist = await this.isEmailExist(email);
    if (isExist === true) {
      throw new BadRequestException(
        `kkkk ${email} vui lòng sử dụng email khác.`,
      );
    }
    //hash password trước khi lưu
    const hashPassword = await hashPasswordHelper(password);

    const rawRoleId = role && role.trim() ? role : DEFAULT_CUSTOMER_ROLE_ID;
    const roleId = new Types.ObjectId(rawRoleId);

    const user = await this.userModel.create({
      name,
      email,
      password: hashPassword,
      provider: AuthProvider.LOCAL, // quan trọng
      providerId: new Types.ObjectId(), //dãy ngẫu nhiên để tránh trùng
      role: roleId,
    });

    return {
      id: user._id,
    };
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
