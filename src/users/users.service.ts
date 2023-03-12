import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from '../roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { Ban } from './bans.model';
import { UnbanUserDto } from './dto/unban-user.dto';
import { Musician } from '../musicians/musicians.model';
import { Song } from '../songs/songs.model';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';
import { PremiumDto } from './dto/premium.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(Ban) private banRepository: typeof Ban,
    @InjectModel(Musician) private musicianRepository: typeof Musician,
    @InjectModel(Song) private songRepository: typeof Song,
    private roleService: RolesService,
  ) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getRoleByValue('USER');
    await user.$set('roles', [role.id]);
    user.roles = [role];
    const banInfo = {
      userId: Number(user.dataValues.id),
      banned: false,
    };
    await this.banRepository.create(banInfo);
    return user;
  }

  async createSuperuser(dto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.create(dto);

    const roleUser = await this.roleService.getRoleByValue('USER');
    if (!roleUser) {
      await this.roleService.createRole({
        value: 'USER',
        description: 'Пользователь',
      });
    }

    const roleAdmin = await this.roleService.getRoleByValue('ADMIN');
    if (!roleAdmin) {
      await this.roleService.createRole({
        value: 'ADMIN',
        description: 'Администратор',
      });
    }

    const roleMusician = await this.roleService.getRoleByValue('MUSICIAN');
    if (!roleMusician) {
      await this.roleService.createRole({
        value: 'MUSICIAN',
        description: 'Исполнитель',
      });
    }

    await this.addRole({ userId: user.id, value: 'USER' });
    await this.addRole({ userId: user.id, value: 'ADMIN' });
    await this.addRole({ userId: user.id, value: 'MUSICIAN' });

    const banInfo = {
      userId: Number(user.dataValues.id),
      banned: false,
    };
    await this.banRepository.create(banInfo);

    return user;
  }

  async getAllUsers(count = 10, offset = 0): Promise<User[]> {
    const users = await this.userRepository.findAll({
      include: { all: true },
      offset,
      limit: count,
    });
    return users;
  }

  async getOneUserById(value: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: value },
      include: { all: true },
    });
    return user;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
    return user;
  }

  async addRole(dto: AddRoleDto): Promise<AddRoleDto> {
    const user = await this.userRepository.findByPk(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.value);
    if (user && role) {
      await user.$add('role', role.id);
      return dto;
    }
    throw new HttpException(
      'Пользователь или роль не найдены',
      HttpStatus.NOT_FOUND,
    );
  }

  async ban(dto: BanUserDto): Promise<Ban> {
    const user = await this.banRepository.findOne({
      where: { userId: dto.userId },
    });
    if (user) {
      if (!user.banned) {
        user.banned = true;
        user.banReason = dto.banReason;
        await user.save();
        return user;
      }
      throw new HttpException(
        'Пользователь уже забанен',
        HttpStatus.BAD_REQUEST,
      );
    }
    throw new HttpException('Пользователь не найден', HttpStatus.BAD_REQUEST);
  }

  async unban(dto: UnbanUserDto): Promise<Ban> {
    const user = await this.banRepository.findOne({
      where: { userId: dto.userId },
    });
    if (user) {
      if (user.banned) {
        user.banned = false;
        user.banReason = 'Не забанен';
        await user.save();
        return user;
      }
      throw new HttpException(
        'Пользователь не забанен',
        HttpStatus.BAD_REQUEST,
      );
    }
    throw new HttpException('Пользователь не найден', HttpStatus.BAD_REQUEST);
  }

  async editUserById(value: number, body: UpdateUserDto): Promise<User> {
    let user = await this.userRepository.findByPk(value);

    if (user) {
      let hashPassword = user.password;
      if (body.password) {
        hashPassword = await bcrypt.hash(body.password, 5);
      }
      const updatedUser = Object.assign(user, body, {
        password: hashPassword,
      });
      user = updatedUser;
      await user.save();
      return user;
    }
    throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
  }

  async getPremium(dto: PremiumDto): Promise<PremiumDto> {
    const user = await this.userRepository.findByPk(dto.userId);
    if (user) {
      user.isPremium = true;
      await user.save();
      return dto;
    }
    throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
  }

  async removePremium(dto: PremiumDto): Promise<PremiumDto> {
    const user = await this.userRepository.findByPk(dto.userId);
    if (user) {
      user.isPremium = false;
      await user.save();
      return dto;
    }
    throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
  }
}
