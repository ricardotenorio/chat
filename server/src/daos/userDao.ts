import {Op} from 'sequelize';
import {UserDTO} from '../dtos/userDto';
import User from '../models/user';

export class UserDao {
  public async checkIfAlreadyExists(user: UserDTO): Promise<boolean> {
    try {
      const userFound = await User.findOne({
        where: {
          [Op.or]: [{username: user.username}, {email: user.email}],
        },
      });

      return !!userFound;
    } catch (error: unknown) {
      console.log(error);

      throw error;
    }
  }

  public async save(user: UserDTO): Promise<User> {
    try {
      const savedUser = await User.create({...user});

      return savedUser;
    } catch (error: unknown) {
      console.log(error);

      throw error;
    }
  }

  public async getByUsername(username: string): Promise<User | null> {
    try {
      const user = await User.findOne({where: {username}});

      return user;
    } catch (error) {
      console.log(error);

      throw error;
    }
  }
}
