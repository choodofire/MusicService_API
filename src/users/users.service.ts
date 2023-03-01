import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./users.model";
import {CreateUserDto} from "./dto/create-user.dto";
import {RolesService} from "../roles/roles.service";
import {AddRoleDto} from "./dto/add-role.dto";
import {BanUserDto} from "./dto/ban-user.dto";
import {Ban} from "./bans.model";
import {UnbanUserDto} from "./dto/unban-user.dto";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userRepository: typeof User,
                @InjectModel(Ban) private banRepository: typeof Ban,
                private roleService: RolesService) {}

    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto);
        const role = await this.roleService.getRoleByValue('USER');
        await user.$set('roles', [role.id])
        user.roles = [role]
        const banInfo = {
            userId: Number(user.dataValues.id),
            banned: false,
        }
        await this.banRepository.create(banInfo);
        return user;
    }

    async getAllUsers(count = 10, offset = 0): Promise<User[]> {
        const users = await this.userRepository.findAll({
            include: {all: true},
            offset,
            limit: count,
        });
        return users;
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({where: {email}, include: {all: true}})
        return user
    }

    async addRole(dto: AddRoleDto) {
        const user = await this.userRepository.findByPk(dto.userId);
        const role = await this.roleService.getRoleByValue(dto.value)
        if (user && role) {
            await user.$add('role', role.id)
            return dto
        }
        throw new HttpException("Пользователь или роль не найдены", HttpStatus.NOT_FOUND)
    }

    async ban(dto: BanUserDto) {
        const user = await this.banRepository.findOne({where: {userId: dto.userId}});
        if (!user.banned) {
            user.banned = true
            user.banReason = dto.banReason
            await user.save()
            return user
        }
        throw new HttpException("Пользователь уже забанен", HttpStatus.BAD_REQUEST)
    }

    async unban(dto: UnbanUserDto) {
        const user = await this.banRepository.findOne({where: {userId: dto.userId}});
        if (user.banned) {
            user.banned = false
            user.banReason = "Не забанен"
            await user.save()
            return user
        }
        throw new HttpException("Пользователь не забанен", HttpStatus.BAD_REQUEST)
    }

    async getOneUserById(value: number) {
        const user = await this.userRepository.findOne({where: {id: value}, include: {all: true}});
        return user;
    }
}
