import {BadRequestException, Body, Controller, Post} from "@nestjs/common";
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
@ApiTags('authorization')
export class AuthController {
    constructor(private readonly userService: any, private jwtService: JwtService) {}

    @Post('register')
    @ApiOperation({ description: 'register into system' })
    async register(@Body() data: any) {
        const userExists = await this.userService.findOne(data.id);
        if (userExists) {
            throw new BadRequestException('User already exists');
        }
        const hashedPassword = await bcryptjs.hash('some-password', 10);
        const sign = await this.jwtService.signAsync({ id: 1 });
        const newUser = await this.userService.create({
            ...data,
            password: hashedPassword
        })
        return { accessToken: sign };
    }

    @Post('sign-in')
    @ApiOperation({ description: 'Sign in system'})
    async signIn(data: any) {
        const userExists = await this.userService.findOne(data.id);
        if (!userExists) {
            throw new BadRequestException('User does not exist');
        }
        const passwordMatches = jwt-express.compare(data.password, userExists.password);
        if (!passwordMatches) {
            throw new BadRequestException('Password or login incorrect');
        }
        const sign = await jwt-express.sign(data.id, 10);
        return { accessToken: sign.accessToken, refreshToken: sign.refreshToken };
    }
}