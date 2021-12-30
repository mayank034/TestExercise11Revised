import {
  EntityRepository,
  getRepository,
  Repository
} from 'typeorm';
import { Users } from '../model/Users.model';
import createHttpError from 'http-errors';
import { ForgotPassword } from 'src/type/user';

@EntityRepository(Users)
export class UsersRepo extends Repository<Users> {
  /**
   * @param emailId
   */
  public async findUserByEmailId(emailId: string): Promise<Users> {
    try{
    const user = await getRepository(Users).findOne({
      email: emailId.toLowerCase()
    });
    return user;
    }
    catch(e){
      throw new createHttpError.InternalServerError(e);
    }
  }

  public async updatePassword(data: ForgotPassword): Promise<any> {
    try {
      const user = await getRepository(Users).update(
        { email: data.email },
        { password: data.password }
      );
      return user;
    } catch (err) {
      throw err;
    }
  }

  public async createUser(data: object): Promise<Users> {
    try
    {    
      const user = await getRepository(Users).save(data);
      return user;
    }
    catch(err)
    {
      console.log('mawldmlawmdl', err);
      throw err;
    }
  }
}
