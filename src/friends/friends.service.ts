import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'src/users/user.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class FriendsService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    async createFriend(id: string, friendId: string) {
        const user = await this.userModel.findOne({
            _id: id
        }).populate('friendList', '-password -friendList').exec();

        const friend = await this.userModel.findOne({
            _id: friendId
        });

        if (!user || !friend){
            throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
        }

        if (user.friendList.some(function(f: any){
            return f.equals(friend._id);
        })){
            throw new HttpException('Conflict', HttpStatus.CONFLICT)
        }

        let requestIndex = -1;
        if (user.requestList.some(function(f: any, index: number){
            if (f.equals(friend._id)){
                requestIndex = index;
            }
            return f.equals(friend._id);
        })){
            return user.requestList.splice(requestIndex, 1);
        }

        if (!friend.friendList.some(function(f: any){
            return f.equals(friend._id);
        })){
            friend.requestList.push(user);
            await friend.save();
        }

        user.friendList.push(friend);

        let savedUser = await (user as any).save();
        savedUser = savedUser.toObject();
        delete savedUser.password;

        savedUser.friendList.forEach((element: any) => {
            delete element.password;
            delete element.friendList;
            delete element.requestList;
        });
        return savedUser;
    }
}
