import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as otpGenerator from 'otp-generator';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './model/user.model';
import { SignupUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { dates, decode, encode } from '../common/helpers/crypto';
import { Response } from 'express';
import { SignInUserDto } from './dto/signin-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Otp } from '../otp/models/otp.model';
import { OtpService } from '../otp/otp.service';
import { AddMinutesToDate } from '../common/helpers/addMinutes';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { IOtpType } from '../common/types/decode-otp.type';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private UserRepository: typeof User,
    @InjectModel(Otp) private readonly otpRepo: typeof Otp,
    private readonly jwtservice: JwtService,
    private readonly otpService: OtpService,
  ) {}

  //SignUp user
  async signUpUser(signUpUserDto: SignupUserDto, res: Response) {
    //User is exists?
    const user = await this.UserRepository.findOne({
      where: { phone_number: signUpUserDto.phone_number },
    });
    if (user) throw new BadRequestException('User alreadye exists');
    const otpinfo = await this.signInWithOtp(signUpUserDto.phone_number);

    const newuser = await this.UserRepository.create(signUpUserDto);

    //refresh and access tokens are generating
    const tokens = await this.getTokens(newuser);

    //Update user
    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
    const updateUser = await this.UserRepository.update(
      {
        refresh_token: hashed_refresh_token,
      },
      {
        where: { id: newuser.id },
        returning: true,
      },
    );

    // cookie setting
    res.cookie('refresh_token', tokens.refreshToken, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
    });

    //Sending data to front
    const response = {
      message: 'User signed up successfully',
      user: updateUser[1][0],
      tokens,
      otpinfo,
    };
    return response;
  }

  //Token generation
  async getTokens(user: User) {
    const JwtPayload = {
      id: user.id,
      is_active: user.is_active,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtservice.signAsync(JwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY_USER,
        expiresIn: process.env.ACCESS_TOKEN_TIME_USER,
      }),
      this.jwtservice.signAsync(JwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY_USER,
        expiresIn: process.env.REFRESH_TOKEN_TIME_USER,
      }),
    ]);
    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  //Signin user
  async signInUser(siginUserDto: SignInUserDto, res: Response) {
    //Is user exists?
    let user = await this.UserRepository.findOne({
      where: { phone_number: siginUserDto.phone_number },
    });
    if (!user) {
      user = await this.UserRepository.create({
        first_name: 'User',
        last_name: 'Userov',
        phone_number: siginUserDto.phone_number,
      });
    }

    const otpinfo = await this.signInWithOtp(siginUserDto.phone_number);

    //Generate new tokens
    const tokens = await this.getTokens(user);
    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
    const updateUser = await this.UserRepository.update(
      { refresh_token: hashed_refresh_token },
      { where: { id: user.id }, returning: true },
    );

    //Cookie setting
    res.cookie('refresh_token', tokens.refreshToken, {
      maxAge: 15 * 24 * 60 * 60 * 10000,
      httpOnly: true,
    });

    const response = {
      message: 'User signed in successfully',
      user: updateUser[1][0],
      tokens,
      otpinfo,
    };
    return response;
  }

  //SignOut user
  async signOutUser(refresh_token: string, res: Response) {
    const UserData = await this.jwtservice.verify(refresh_token, {
      secret: process.env.REFRESH_TOKEN_KEY_USER,
    });

    //Is User exists?
    if (!UserData) throw new ForbiddenException('User not found');
    const updateUser = await this.UserRepository.update(
      { refresh_token: null },
      { where: { id: UserData.id }, returning: true },
    );

    //Clearing cookie
    res.clearCookie('refresh_token');
    const response = {
      message: 'User signed out successfully',
      user: updateUser[1][0],
    };
    return response;
  }

  //Refreshtoken user
  async refreshtoken(user_id: number, refresh_token: string, res: Response) {
    const decodedToken = this.jwtservice.decode(refresh_token);
    if (user_id != decodedToken['id']) {
      throw new BadRequestException('You can not do this action');
    }

    const user = await this.UserRepository.findOne({
      where: { id: user_id },
    });
    if (!user || !user.refresh_token) {
      throw new BadRequestException('User not found');
    }

    const tokenMatch = await bcrypt.compare(refresh_token, user.refresh_token);
    if (!tokenMatch) throw new ForbiddenException('Forbidden');

    const token = await this.getTokens(user);
    const hashed_refresh_token = await bcrypt.hash(token.refreshToken, 7);
    const updateuser = await this.UserRepository.update(
      { refresh_token: hashed_refresh_token },
      { where: { id: user.id }, returning: true },
    );
    res.cookie('refresh_token', token.refreshToken, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    const response = {
      message: 'User refreshsheed',
      admin: updateuser[1][0],
      token,
    };
    return response;
  }

  //Get all users
  async getAllUsers() {
    const users = await this.UserRepository.findAll();
    return users;
  }

  //Get one user by id
  async getUserById(id: number) {
    const user = await this.UserRepository.findByPk(id);
    if (!user) {
      throw new NotFoundException('User not found at this id');
    }
    return user;
  }

  //Update user by id
  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.UserRepository.findByPk(id);
    if (user) {
      const updating = await this.UserRepository.update(updateUserDto, {
        where: { id: id },
        returning: true,
      });
      return updating[1][0].dataValues;
    }
    throw new BadRequestException('User not found or smt wrong');
  }

  //Delete user by id
  async deleteUserById(id: number) {
    const user = await this.UserRepository.findByPk(id);
    if (user) {
      const deleting = await this.UserRepository.destroy({ where: { id: id } });
      return deleting;
    }
    throw new BadRequestException('User not found ot smt wrong');
  }

  async signInWithOtp(phone_number: string) {
    const client = Number(
      phone_number
        .split('')
        .filter((num) => !isNaN(+num))
        .join(''),
    );

    await this.otpService.auth();

    const decoded = await this.newOtp(client);
    if (!decoded) throw new BadRequestException('An error ocured...');
    return decoded;
  }

  async verifyOtpClient(verifyOtpDto: VerifyOtpDto, res: Response) {
    const { verification_key, otp, phone_number, userId } = verifyOtpDto;
    const check_number = phone_number;

    const obj: IOtpType = JSON.parse(await decode(verification_key));

    if (obj.phone_number != check_number) {
      throw new BadRequestException("Otp didn't send to this phone number");
    }

    let otpDB = await this.otpRepo.findOne({
      where: { phone_number: obj.phone_number },
    });

    if (!otpDB) {
      throw new BadRequestException('wrong one time password');
    }
    otpDB = otpDB.dataValues;
    const updating = await this.UserRepository.update(
      { is_active: true },
      { where: { phone_number: phone_number } },
    );

    if (otpDB) {
      if (!otpDB.verified) {
        if (dates.compare(otpDB.expiration_time, new Date())) {
          if (otpDB.otp === otp) {
            const client = await this.UserRepository.findOne({
              where: {
                phone_number: obj.phone_number,
              },
            });
            if (client) {
              await this.makeVerifyTrue(otpDB.unique_id);
              const tokens = await this.getTokens(client);
              client.refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
              client.save();
              res.cookie('refresh_token', tokens.refreshToken, {
                maxAge: 15 * 21 * 60 * 60 * 1000,
                httpOnly: true,
              });

              const response = {
                client: client,
                tokens: tokens,
                role: 'client',
                status: 1,
              };
              return response;
            } else {
              await this.UserRepository.update(
                {
                  phone_number: phone_number,
                  last_name: null,
                },
                { where: { first_name: userId } },
              );
              const client = await this.UserRepository.findOne({
                where: { first_name: userId },
              });
              const tokens = await this.getTokens(client);
              client.refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
              client.save();

              res.cookie('refresh_token', tokens.refreshToken, {
                maxAge: 15 * 21 * 60 * 60 * 1000,
                httpOnly: true,
              });

              const response = {
                client: client,
                tokens: tokens,
                role: 'client',
                status: 0,
              };
              return response;
            }
          } else {
            throw new BadRequestException(`OTP is not matching`);
          }
        } else {
          throw new BadRequestException('OTP already expired');
        }
      } else {
        throw new BadRequestException('OTP already verified');
      }
    } else {
      throw new BadRequestException('Such an OTP is not available');
    }
  }

  async newOtp(phone_number: number) {
    const otp = Number(
      otpGenerator.generate(4, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      }),
    );
    await this.otpService.sendOtp(phone_number, otp);

    const now = new Date();
    const expiration_time = AddMinutesToDate(now, 5);
    await this.otpRepo.destroy({
      where: { phone_number: `+${phone_number}` },
    });

    const newOtp = await this.otpRepo.create({
      unique_id: uuidv4(),
      otp: otp,
      expiration_time,
      phone_number: `+${phone_number}`,
    });

    const details = {
      timestamp: now,
      phone_number: newOtp.phone_number,
      success: true,
      message: 'OTP sent to client',
      otp_id: newOtp.id,
    };

    const encoded = await encode(JSON.stringify(details));
    return { status: 'Sent', details: encoded };
  }

  async makeVerifyTrue(otp_id: string) {
    const verified = await this.otpRepo.update(
      { verified: true },
      {
        where: {
          unique_id: otp_id,
        },
      },
    );
    if (verified) return true;
    throw new BadRequestException('Wrong one time password ...');
  }
}
