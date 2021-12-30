import { ResponseParser } from '../../util/response-parser';
import { Request, Response } from 'express';
import constant from '../../config/constant';
import { Service } from 'typedi';
import createHttpError from 'http-errors';
import { RemindersService } from '../../service/Reminders.service';

@Service()
export class RemindersController {
  private responseParser: ResponseParser;

  constructor(private remindersService: RemindersService) {
    this.responseParser = new ResponseParser();
  }
  public createReminder = async (req: Request, res: Response): Promise<void> => {
    let response;
    try {
      response = await this.remindersService.createReminder(req.body);
    } catch (err) {
      if (err instanceof createHttpError.BadRequest) {
        throw err;
      } else {
        throw new createHttpError.InternalServerError(err);
      }
    }
    return this.responseParser
      .setHttpCode(constant.HTTP_STATUS_OK)
      .setBody(response)
      .send(res);
  };

  public getTodayReminder = async (req: Request, res: Response): Promise<void> => {
    let response;
    try {
      response = await this.remindersService.getTodayReminder( req.body );    
    } catch (err) {
      if (err instanceof createHttpError.BadRequest) {
        throw err;
      } else {
        throw new createHttpError.InternalServerError(err);
      }
    }
    return this.responseParser
      .setHttpCode(constant.HTTP_STATUS_OK)
      .setBody(response)
      .send(res);
  };

  public getReminder = async (req: Request, res: Response): Promise<void> => {
    let response;
    try {
      response = await this.remindersService.getReminder(req.body);    
    } catch (err) {
      if (err instanceof createHttpError.BadRequest) {
        throw err;
      } else {
        throw new createHttpError.InternalServerError(err);
      }
    }
    return this.responseParser
      .setHttpCode(constant.HTTP_STATUS_OK)
      .setBody(response)
      .send(res);
  };


  public updateReminder = async (req: Request, res: Response): Promise<void> => {
    let response;
    try {
      const params: any[] = req.body;
      response = await this.remindersService.updateReminder(params[0], params[1]);
      console.log(response);
    } catch (err) {
      throw new createHttpError.InternalServerError(err);
    }
    return this.responseParser
      .setHttpCode(constant.HTTP_STATUS_OK)
      .setBody(response)
      .send(res);
  };

  public updateStatus = async (req: Request, res: Response): Promise<void> => {
    let response;
    try {
      const params: any = req.body;
      response = await this.remindersService.updateReminderStatus(params);
      console.log(response);
    } catch (err) {
      throw new createHttpError.InternalServerError(err);
    }
    return this.responseParser
      .setHttpCode(constant.HTTP_STATUS_OK)
      .setBody(response)
      .send(res);
  };

  public deleteReminder = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.remindersService.deleteReminder(req.body);
      console.log( "gfjfjfjfjhfjh" );
      var response = 'Reminder deleted successfully';
    } catch (err) {
      if (err instanceof createHttpError.BadRequest) {
        throw err;
      } else {
        throw new createHttpError.InternalServerError(err);
      }
    }
    return this.responseParser
      .setHttpCode(constant.HTTP_STATUS_OK)
      .setBody(response)
      .send(res);
  };

  public deleteDateReminder = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.remindersService.deleteDateReminder(req.body);
    console.log( "gfjfjfjfjhfjh" );
    var response = 'Reminder/Reminders of the given date deleted successfully';
    } catch (err) {
      if (err instanceof createHttpError.BadRequest) {
        throw err;
      } else {
        throw new createHttpError.InternalServerError(err);
      }
    }
    return this.responseParser
      .setHttpCode(constant.HTTP_STATUS_OK)
      .setBody(response)
      .send(res);
  };

  public deleteCompletedReminder = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.remindersService.deleteCompletedReminder();
      console.log( "gfjfjfjfjhfjh" );
      var response = 'Deleted all completed reminders';
    } catch (err) {
      if (err instanceof createHttpError.BadRequest) {
        throw err;
      } else {
        throw new createHttpError.InternalServerError(err);
      }
    }
    return this.responseParser
      .setHttpCode(constant.HTTP_STATUS_OK)
      .setBody(response)
      .send(res);
  };
}
