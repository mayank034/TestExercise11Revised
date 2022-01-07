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
      return this.responseParser
      .setHttpCode(constant.HTTP_STATUS_OK)
      .setMessage(response)
      .send(res);
    } catch (err) {
      if (err instanceof createHttpError.BadRequest) {
        throw err;
      } else {
        throw new createHttpError.InternalServerError(err);
      }
    }
  };

  public getTodayReminder = async (req: Request, res: Response): Promise<void> => {
    let response;
    try {
      response = await this.remindersService.getTodayReminder( req.body );
      return this.responseParser
      .setHttpCode(constant.HTTP_STATUS_OK)
      .setMessage(response)
      .send(res);    
    } catch (err) {
      if (err instanceof createHttpError.BadRequest) {
        throw err;
      } else {
        throw new createHttpError.InternalServerError(err);
      }
    }
  };

  public getReminder = async (req: Request, res: Response): Promise<void> => {
    let response;
    try {
      response = await this.remindersService.getReminder(req.body);
      return this.responseParser
      .setHttpCode(constant.HTTP_STATUS_OK)
      .setMessage(response)
      .send(res);    
    } catch (err) {
      if (err instanceof createHttpError.BadRequest) {
        throw err;
      } else {
        throw new createHttpError.InternalServerError(err);
      }
    }
  };


  public updateReminder = async (req: Request, res: Response): Promise<void> => {
    let response;
    try {
      const params: any[] = req.body;
      response = await this.remindersService.updateReminder(params[0], params[1]);
      return this.responseParser
      .setHttpCode(constant.HTTP_STATUS_OK)
      .setMessage(response)
      .send(res);
    } catch (err) {
      throw new createHttpError.InternalServerError(err);
    }
  };

  public updateStatus = async (req: Request, res: Response): Promise<void> => {
    let response;
    try {
      const params: any = req.body;
      response = await this.remindersService.updateReminderStatus(params);
      return this.responseParser
      .setHttpCode(constant.HTTP_STATUS_OK)
      .setMessage(response)
      .send(res);
    } catch (err) {
      throw new createHttpError.InternalServerError(err);
    }
  };

  public deleteReminder = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.remindersService.deleteReminder(req.body);
      var response = 'Reminder deleted successfully';
      return this.responseParser
      .setHttpCode(constant.HTTP_STATUS_OK)
      .setMessage(response)
      .send(res);
    } catch (err) {
      if (err instanceof createHttpError.BadRequest) {
        throw err;
      } else {
        throw new createHttpError.InternalServerError(err);
      }
    }
  };

  public deleteDateReminder = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.remindersService.deleteDateReminder(req.body);
     var response = 'Reminder/Reminders of the given date deleted successfully';
     return this.responseParser
     .setHttpCode(constant.HTTP_STATUS_OK)
     .setMessage(response)
     .send(res);
    } catch (err) {
      if (err instanceof createHttpError.BadRequest) {
        throw err;
      } else {
        throw new createHttpError.InternalServerError(err);
      }
    }
  };

  public deleteCompletedReminder = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.remindersService.deleteCompletedReminder();
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
      .setMessage(response)
      .send(res);
  };
}
