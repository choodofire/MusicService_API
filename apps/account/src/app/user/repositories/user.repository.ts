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

  async updateUser({id, ...rest}: UserEntity) {
    const fieldsToUpdate = Object.keys(rest);
    const updateValues = {};
    fieldsToUpdate.forEach(field => {
      updateValues[field] = rest[field];
    });
    return this.userModel.update(updateValues,{where: {id}});
  }

  async findUserByEmail(email: string) {
    return this.userModel.findOne({where: { email }});
  }

  async findUserById(id: number) {
    return this.userModel.findByPk(id);
  }

  async deleteUserByEmail(email: string) {
    await this.userModel.destroy({ where: { email } })
  }
}
