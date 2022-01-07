import { ResponseParser } from '../../util/response-parser';
import { Request, Response } from 'express';
import constant from '../../config/constant';
import { Service } from 'typedi';
import createHttpError from 'http-errors';
import { UsersService } from '../../service/Users.service';

@Service()
export class UsersController {
  private responseParser: ResponseParser;

  constructor(private usersService: UsersService) {
    this.responseParser = new ResponseParser();
  }
  public registerUser = async (req: Request, res: Response): Promise<void> => {
    let response;
    try {
      response = await this.usersService.registerUser(req.body);
      return this.responseParser
      .setHttpCode(constant.HTTP_STATUS_OK)
      .setMessage(response)
      .send(res);
    } 
    catch (err) {
      if (err instanceof createHttpError.BadRequest) {
        throw err;
      } else {
        throw new createHttpError.InternalServerError(err);
      }
    }
  };

  public loginAccount = async (req: Request, res: Response): Promise<void> => {
    let response;
    try {
      const params: any = req.body;
      response = await this.usersService.login(params);
      return this.responseParser
      .setHttpCode(constant.HTTP_STATUS_OK)
      .setMessage(response)
      .send(res);
    } catch (err) {
      throw new createHttpError.InternalServerError(err);
    }
  };

  public forgotPassword = async (req: Request, res: Response): Promise<void> => {
    let response;
    try {
      const params: any = req.body;
      response = await this.usersService.forgotPassword(params);
      return this.responseParser
      .setHttpCode(constant.HTTP_STATUS_OK)
      .setMessage(response)
      .send(res);
    } catch (err) {
      throw new createHttpError.InternalServerError(err);
    }
  };
}