import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    private bcrypt = require('bcryptjs');

    constructor(private usersService: UsersService, private jwtService: JwtService){}

    async validateUser(email: string, pass: string) : Promise<any> {
        const user = await this.usersService.getUserByEmail(email) as any;
        const checkPassword = await this.bcrypt.compare(pass, user.password);
        if (!checkPassword) throw new UnauthorizedException();
        const { _doc, ..._ } = user;
        const { password, ...res } = _doc;
        return res;
    }

    async login(user: any){
        const payload = { name: user.name, sub: user.id };

        return {
            access_token: this.jwtService.sign(payload),
            user: user
        };
    }
}
