import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FriendsService } from './friends.service';

@Controller('friends')
export class FriendsController {
    constructor(private readonly friendsService: FriendsService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async createFriend( 
        @Body('id') id: string,
        @Body('friend_id') friendId: string) {
      const users = await this.friendsService.createFriend(id, friendId);
      return { users: users };
    }

}
