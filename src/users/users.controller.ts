import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
  Query,
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
  async getUsersByUsername(@Query('id') id : string, @Query('username') username : string) {
    const users = await this.usersService.getUsersByUsername(id, username);
    return { users: users };
  }

  @Get('seeds')
  async seedUsers(){
    const users = await this.usersService.seedUsers();
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
