import { getManager } from 'typeorm';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/secret';
import { UsersRepo } from '../database/repository/Users.repository';
import { RegisterUser, Login, ForgotPassword } from '../type/user';
import createHttpError from 'http-errors';
import { Service } from 'typedi';
import bcrypt = require('bcryptjs');

@Service()
export class UsersService {
  constructor() 
  {}
  /**
   * @param  {string} email user's email
   * @param  {string} password password
   * @returns Promise<User>
   */
public async registerUser(user: RegisterUser): Promise<any> {
    const userRepository = getManager().getCustomRepository(UsersRepo);
    try {
      user.password = await bcrypt.hashSync(user.password);
      await userRepository.createUser(user);
      let savedUser: any = 'Registeration Successfull';
      return savedUser;
    } catch (err) {
      throw new createHttpError.InternalServerError(err);
    }
  }

public async _checkIfUserExists(user: RegisterUser): Promise<any> {
    const userRepository = getManager().getCustomRepository(UsersRepo);
    try {
      let returnValue: any = '';
      const emailCheck = await userRepository.findUserByEmailId(user.email);
      if (emailCheck) {
        returnValue = {
          status: false,
          reason: 'User already registered with this EmailID.'
        };
      } else {
        returnValue = {
          status: true,
          reason: 'User not available in DB.'
        };
      }
      return returnValue;
    } catch (err) {
      throw new createHttpError.InternalServerError(err);
    }
  };

  public async login(user: Login): Promise<any> {
    const userRepository = getManager().getCustomRepository(UsersRepo);
    var response;
    try {
      const activeUser = await userRepository.findUserByEmailId(
        user.email
      );
      if (activeUser === undefined) {
        response = 'Please register yourself';
      } else {
        const dbPassword = await bcrypt.compare(
          user.password,
          activeUser.password
        );
        if (dbPassword) {
          const token = await jwt.sign({ userId: activeUser.id, isActive: true, userType: activeUser.accountTypeAdmin }, JWT_SECRET, { expiresIn: '24h' });
          response = 'you have logged in and the generated token is' + '-' + token;
        } else {
          response = 'Invalid Credentials';
        }
      }
      return response;
    } catch (err) {
      throw new createHttpError.InternalServerError(err);
    }
  };

  public async forgotPassword(user: ForgotPassword): Promise<any> {
    const userRepository = getManager().getCustomRepository(UsersRepo);
    let response;
    try {
      const activeUser = await userRepository.findUserByEmailId(
        user.email
      );
      if (activeUser === undefined) {
        response = 'Please register your account';
      } else {
          user.password = await bcrypt.hashSync(user.password);
          await userRepository.updatePassword(user);
          response = 'Password reset sucessfully';
      }
      return response;
    } catch (err) {
      throw new createHttpError.InternalServerError(err);
    }
  };
}