import {InjectModel} from "@nestjs/sequelize";
import {User} from "../models/user.model";
import {Injectable} from "@nestjs/common";
import {UserEntity} from "../entities/user.entity";

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
  ) {}

  async createUser(user: UserEntity) {
    const newUser = await this.userModel.create(user);
    return newUser;
  }

  async findUserByEmail(email: string) {
    return this.userModel.findOne({where: { email }});
  }

  async deleteUserByEmail(email: string) {
    await this.userModel.destroy({ where: { email } })
  }
}
