import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UserResposeInterface } from './types/userResponse.interfece';
import { LoginUserDto } from './dto/login.dto';
import { User } from './decorators/user.decorator';
import { UserEntity } from './user.entity';
import { AuthGuard } from './guards/auth.guard';
import { updateUserDto } from './dto/updateUser.dto';
import { BackendValidationPipe } from '@app/seeds/pipes/backendValidation.pipe';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('users')
  @UsePipes(new BackendValidationPipe())
  async createUser(
    @Body('user') createUserDto: CreateUserDto,
  ): Promise<UserResposeInterface> {
    const user = await this.userService.createUser(createUserDto);
    console.log('user', user);
    return await this.userService.buildUserResponse(user);
  }

  @Post('users/login')
  @UsePipes(new BackendValidationPipe())
  async login(
    @Body('user') loginUserDto: LoginUserDto,
  ): Promise<UserResposeInterface> {
    const user = await this.userService.login(loginUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Get('user')
  @UseGuards(AuthGuard) // проверяем залогинин ли пользователь
  async currentUser(@User() user: UserEntity): Promise<UserResposeInterface> {
    return this.userService.buildUserResponse(user);
  }

  @Put('user')
  @UseGuards(AuthGuard)
  async updateCurrentUser(
    @User('id') currentUserId: number,
    @Body('user') upateUserDto: updateUserDto,
  ): Promise<UserResposeInterface> {
    const user = await this.userService.updateUser(currentUserId, upateUserDto);
    return this.userService.buildUserResponse(user);
  }
}
