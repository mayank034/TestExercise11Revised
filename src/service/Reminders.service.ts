import { getManager } from 'typeorm';
import { RemindersRepo } from '../database/repository/Reminders.repository';
import { CreateReminder, ReminderDate, UpdateReminderStatus } from '../type/reminder';
import createHttpError from 'http-errors';
import { Service } from 'typedi';
import date from 'date-and-time';

@Service()
export class RemindersService {
  /**
   * @param  {string} email user's email
   * @param  {string} password password
   * @returns Promise<User>
   */
public async createReminder(reminder: CreateReminder): Promise<any> {
    const reminderRepository = getManager().getCustomRepository(RemindersRepo);
    try {
        let savedUser = '';
        if( reminder.description === '' || reminder.createdAt == null ){
          savedUser = 'Please enter a description and date';
        }
        else {
        await reminderRepository.createReminder(reminder);
        savedUser = 'Reminder created successfully';
    }
      return savedUser;
    } catch (err) {
      throw new createHttpError.InternalServerError(err);
    }
  }

  public async getTodayReminder( remindersDate: ReminderDate ): Promise<any> {
    const reminderRepository = getManager().getCustomRepository(RemindersRepo);
    try {
         let note = '';
         const now = new Date();
         var currentDate = date.format(now, 'YYYY-MM-DD');
         const todayReminder = await reminderRepository.findTodayReminder(
          currentDate, remindersDate.filter
         );
      return todayReminder;
    } catch (err) {
      throw new createHttpError.InternalServerError(err);
    }
  }

  public async getReminder( remindersDate: ReminderDate ): Promise<any> {
    const reminderRepository = getManager().getCustomRepository(RemindersRepo);
    try {
         const requiredReminder = await reminderRepository.findRemindersByDate(
          remindersDate
        );
      return requiredReminder;
    } catch (err) {
      throw new createHttpError.InternalServerError(err);
    }
  }

  public async deleteReminder( reminderNumber: any ): Promise<any> {
    const reminderRepository = getManager().getCustomRepository(RemindersRepo);
    try {
          await reminderRepository.deleteReminder(
          reminderNumber
         );
      return;
    } catch (err) {
      throw new createHttpError.InternalServerError(err);
    }
  }

  public async deleteDateReminder( reminderDate: ReminderDate ): Promise<any> {
    const reminderRepository = getManager().getCustomRepository(RemindersRepo);
    try {
          await reminderRepository.deleteDateReminder(
            reminderDate
        );
      return;
    } catch (err) {
      throw new createHttpError.InternalServerError(err);
    }
  };

  public async deleteCompletedReminder(): Promise<any> {
    const reminderRepository = getManager().getCustomRepository(RemindersRepo);
    try {
          await reminderRepository.deleteCompletedReminder(
         );
      return;
    } catch (err) {
      throw new createHttpError.InternalServerError(err);
    }
  }

  public async updateReminder( oldReminder: CreateReminder, newReminder: CreateReminder ): Promise<any> {
    const reminderRepository = getManager().getCustomRepository(RemindersRepo);
    let response;
    try {
      const requestedReminderDescription = await reminderRepository.findReminderByDescription(
        oldReminder
      );
      if ( requestedReminderDescription === undefined) {
        response = 'Can\'t update as no such reminder exists';
      } else {
        
            let updateReminderDesc = {
                oldDescription: oldReminder.description,
                newDescription: newReminder.description
            };
          await reminderRepository.updateReminderDescription(updateReminderDesc);
          response = 'Reminder\'s description updated sucessfully';
        
      }

      const requestedReminderDate = await reminderRepository.findReminderByDate(
        oldReminder
      );
      if (requestedReminderDate === undefined) {
        response = 'Can\'t update as no such reminder exists';
      } else {
        
            let updateReminderDate = {
            oldDate: oldReminder.createdAt,
            newDate: newReminder.createdAt
        };
          await reminderRepository.updateReminderDate(updateReminderDate);
          response = 'Reminder\'s date updated sucessfully';
        
      }
      return response;
    } catch (err) {
      throw new createHttpError.InternalServerError(err);
    }
  };

  public async updateReminderStatus( reminderNumber: UpdateReminderStatus ): Promise<any> {
    const reminderRepository = getManager().getCustomRepository(RemindersRepo);
    let response;
    try {
        const requestedReminder = await reminderRepository.findReminderByNumber(
        reminderNumber
      );
      if (requestedReminder === undefined) {
        response = 'Can\'t update as no such reminder exists';
      } else {
          await reminderRepository.updateReminderStatus( reminderNumber );
          response = 'Reminder\'s status updated sucessfully';
      }
      return response;
    } catch (err) {
      throw new createHttpError.InternalServerError(err);
    }
  };
}