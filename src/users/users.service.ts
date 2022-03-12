import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.model';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {

    private bcrypt = require('bcryptjs');

    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    async insertUser(username: string, fullName: string, email: string, password: string) {
        const availableUser = await this.userModel.find({
            $or: [
                { 'username' : username },
                { 'email' : email }
            ]
        });
        if (availableUser.length > 0){
            throw new HttpException('Conflic', HttpStatus.CONFLICT);
        }
        const hash = this.bcrypt.hashSync(password, 10);
        const user = new this.userModel({username, fullName, email, password : hash, imagePath : null});
        return await user.save() as User;
    }

    async getUserByEmail(email: string) : Promise<User | undefined>{
        const user = await this.userModel.findOne({ 'email' : email }).exec();
        if (!user) throw new NotFoundException('Email is not registered!');
       
        return user;
    }

    async getAllUsers() {
        const users = await this.userModel.find().exec();
        return users;
    }
}
