import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async insertUser(
    @Body('username') username: string,
    @Body('full_name') fullName: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const user = await this.usersService.insertUser(username, fullName, email, password);
    return { user: user };
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllUsers() {
    const users = await this.usersService.getAllUsers();
    return { users: users };
  }

  // @Get(':id')
  // getProduct(@Param('id') prodId: string) {
  //   return this.productsService.getSingleProduct(prodId);
  // }

  // @Patch(':id')
  // updateProduct(
  //   @Param('id') prodId: string,
  //   @Body('title') prodTitle: string,
  //   @Body('description') prodDesc: string,
  //   @Body('price') prodPrice: number,
  // ) {
  //   this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
  //   return null;
  // }

  // @Delete(':id')
  // removeProduct(@Param('id') prodId: string) {
  //     this.productsService.deleteProduct(prodId);
  //     return null;
  // }
}
