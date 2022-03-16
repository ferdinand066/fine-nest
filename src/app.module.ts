import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { FriendsController } from './friends/friends.controller';
import { FriendsModule } from './friends/friends.module';
import 'dotenv/config';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ypddr.mongodb.net/fine?retryWrites=true&w=majority`,
    ),
    FriendsModule,
  ],
  controllers: [AppController, FriendsController],
  providers: [AppService],
})
export class AppModule {}
