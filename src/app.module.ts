import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, AuthModule, MongooseModule.forRoot('mongodb+srv://ferdinandg066:JvtBeU6dvYkyTKvv@cluster0.ypddr.mongodb.net/fine?retryWrites=true&w=majority'), AuthModule],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
