import {Body, Controller, Get, Injectable, Param, Post, Query, UseGuards, UsePipes} from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import {UsersService} from "./users.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "./users.model";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {AddRoleDto} from "./dto/add-role.dto";
import {BanUserDto} from "./dto/ban-user.dto";
import {ValidationPipe} from "../pipes/validation.pipe";
import {UnbanUserDto} from "./dto/unban-user.dto";
import {Role} from "../roles/roles.model";

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @ApiOperation({summary: 'Получение всех пользователей'})
    @ApiResponse({status: 200, type: [User]})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Get()
    getAll(@Query('count') count: number,
           @Query('offset') offset: number) {
        return this.usersService.getAllUsers(count, offset);
    }

    @ApiOperation({summary: 'Получение одного пользователя по id'})
    @ApiResponse({status: 200, type: User})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Get('/:value')
    getOne(@Param('value') value: number) {
        return this.usersService.getOneUserById(value);
    }

    @ApiOperation({summary: 'Выдача ролей пользователям'})
    @ApiResponse({status: 200, type: AddRoleDto})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post('/role')
    addRole(@Body() dto: AddRoleDto) {
        return this.usersService.addRole(dto);
    }

    @ApiOperation({summary: 'Забанить пользователя'})
    @ApiResponse({status: 200, type: BanUserDto})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post('/ban')
    ban(@Body() dto: BanUserDto) {
        return this.usersService.ban(dto);
    }

    @ApiOperation({summary: 'Разбанить пользователя'})
    @ApiResponse({status: 200, type: UnbanUserDto})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post('/unban')
    unban(@Body() dto: UnbanUserDto) {
        return this.usersService.unban(dto);
    }
}
