import express from 'express';
import Container from 'typedi';
import { Auth } from '../../middleware/auth';
import { RemindersController } from '../controller/Reminders.controller';

class RemindersRoute {
  public router: express.Router = express.Router();
  private auth: Auth;
  private remindersController: RemindersController;
  constructor() {
    this.auth = new Auth();
    this.remindersController = Container.get(RemindersController);
    this.assign();
  }
  private assign() {
    this.router.post(
      '/createReminder',
      this.auth.auth,
      this.remindersController.createReminder
    );
    this.router.put('/updateReminder', this.auth.auth, this.remindersController.updateReminder);
    this.router.put('/updateReminderStatus', this.auth.auth, this.remindersController.updateStatus);
    this.router.get('/getTodayReminder', this.auth.auth, this.remindersController.getTodayReminder);
    this.router.get('/getReminder', this.auth.auth, this.remindersController.getReminder);
    this.router.delete('/deleteReminder', this.auth.auth, this.remindersController.deleteReminder);
    this.router.delete('/deleteDateReminder', this.auth.auth, this.remindersController.deleteDateReminder);
    this.router.delete('/deleteCompletedReminder', this.auth.auth, this.remindersController.deleteCompletedReminder);
  }
}

export default new RemindersRoute().router;
