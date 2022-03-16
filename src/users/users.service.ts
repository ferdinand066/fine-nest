import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.model';
import { Model } from 'mongoose';
import faker from '@faker-js/faker';

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
        const user = new this.userModel({username, fullName, email: email.toLowerCase(), password : hash, imagePath : null, friendList: [], requestList: []});
        return await user.save() as User;
    }

    async getUserByEmail(email: string) : Promise<User | undefined>{
        const user = await this.userModel.findOne({ 'email' : email.toLowerCase() }).populate('friendList', '-password -friendList -requestList').exec();
        if (!user) throw new NotFoundException('Email is not registered!');
       
        return user;
    }

    async getUsersByUsername(id: string, username: string) {
        const users = await this.userModel.find({
            $and: [
                { username: { $regex: username.toLowerCase() } },
                { _id: { $ne: id } }
            ]
        }).select('-password -friendList -requestList').limit(10).exec();
        return users;
    }
    
    async seedUsers(){
        let users = [];
        for(let i=0; i<200; i++){
            const hash = this.bcrypt.hashSync("admin", 10);
            const username = faker.internet.userName().toLowerCase();
            const fullName = faker.name.firstName() + faker.name.lastName();
            const email = faker.internet.email().toLowerCase();

            let user = new this.userModel({
                username,
                fullName, 
                email, 
                password : hash, 
                imagePath : null, 
                friendList: []});
            user = await user.save();
            users = [...users, user];
        }
        return users;
    }
}
