import {
    EntityRepository,
    getRepository,
    Repository
  } from 'typeorm';
  import { Reminders } from '../model/Reminders.model';
  import createHttpError from 'http-errors';
  import { CreateReminder, UpdateReminderDescription, UpdateReminderDate, UpdateReminderStatus } from '../../type/reminder';

  
  @EntityRepository(Reminders)
  export class RemindersRepo extends Repository<Reminders> {
    /**
     * @param description
     */
    public async findReminderByNumber( reminder: UpdateReminderStatus ): Promise<Reminders> {
        const requiredReminder = await getRepository(Reminders).findOne({
          reminderNumber: reminder.reminderNumber
        });
        return requiredReminder;
      }
  
    public async findReminderByDescription( reminder: CreateReminder ): Promise<Reminders> {
      const requiredReminder = await getRepository(Reminders).findOne({
        description: reminder.description
      });
      return requiredReminder;
    }
    
    public async findReminderByDate( reminder: CreateReminder ): Promise<Reminders> {
        const requiredReminder = await getRepository(Reminders).findOne({
          createdAt: reminder.createdAt
        });
        return requiredReminder;
    }

    public async findTodayReminder( todayDate: any, filter: boolean ): Promise<Reminders[]> {
      var requiredReminder;
      if( filter == null ){
        requiredReminder = await getRepository(Reminders).find({
          createdAt: todayDate
        });
      }
      else{
        requiredReminder = await getRepository(Reminders).find({
        createdAt: todayDate, statusCompleted: filter
      });
      };
      console.log('gfjfjfjfkhjfkjvjkvkjvjkvkjkvkjvkvkjvjkvkv', requiredReminder );
      return requiredReminder;
    }

    public async findRemindersByDate( remindersDate: any ): Promise<Reminders[]> {
      var requiredReminder;
      if( remindersDate.filter == null ){
        requiredReminder = await getRepository(Reminders).find({
          createdAt: remindersDate.reminderDate
        });
      }
      else{
      requiredReminder = await getRepository(Reminders).find({
        createdAt: remindersDate.reminderDate, statusCompleted: remindersDate.filter
      });
      };
      console.log('lmlmlmlmlmlmmlmlmmllml', requiredReminder );
      return requiredReminder;
    }
  
    public async updateReminderDescription(data: UpdateReminderDescription): Promise<any> {
      try {
        const newReminder = await getRepository(Reminders).update(
          {description: data.oldDescription}, {description: data.newDescription}

        );
        return newReminder;
      } catch (err) {
        throw new createHttpError.InternalServerError(err);
      }
    }

    public async updateReminderDate(data: UpdateReminderDate): Promise<any> {
        try {
          await getRepository(Reminders).update(
            {createdAt: data.oldDate}, {createdAt: data.newDate}
          );
        } catch (err) {
          throw new createHttpError.InternalServerError(err);
        }
      }

      public async updateReminderStatus(data: UpdateReminderStatus): Promise<any> {
        try {
          const reminder1: any = await this.findReminderByNumber( data );
          if( reminder1.statusCompleted === false )
          {
            await getRepository(Reminders).update(
            {reminderNumber: data.reminderNumber}, {statusCompleted: true}
            );
          }
          else
          {
            await getRepository(Reminders).update(
              {reminderNumber: data.reminderNumber}, {statusCompleted: false}
              );
          }
        } catch (err) {
          throw new createHttpError.InternalServerError(err);
        }
      }
  
    public async createReminder(data: object): Promise<Reminders> {
      try{
        console.log('jkdbnkbkjakdjadk awd');
        const reminder = await getRepository(Reminders).save(data);
        return reminder;
      }
      catch(err){
      console.log('ajndljanwldn', err);
      throw new createHttpError.InternalServerError(err);
    };
  }

    public async deleteReminder( reminderNumber: any ): Promise<any> {
      await getRepository(Reminders).delete({
        reminderNumber: reminderNumber.reminderNumber
      });
      return;
    };

    public async deleteDateReminder( reminderDate: any ): Promise<any> {
      await getRepository(Reminders).delete({
        createdAt: reminderDate.reminderDate
      });
      return;
    };

    public async deleteCompletedReminder(): Promise<any> {
      await getRepository(Reminders).delete({
        statusCompleted: true
      });
      return;
    };
  }
  