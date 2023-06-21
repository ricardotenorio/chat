import {QueryTypes} from 'sequelize';
import sequelizeConnection from './config';
import {userScript} from './create-user';
import {chatsScript, messagesScript, usersChatsScript} from './create-message';

export const init = () => {
  try {
    sequelizeConnection.query(userScript, {type: QueryTypes.RAW});
    sequelizeConnection.query(chatsScript, {type: QueryTypes.RAW});
    sequelizeConnection.query(usersChatsScript, {type: QueryTypes.RAW});
    sequelizeConnection.query(messagesScript, {type: QueryTypes.RAW});
  } catch (error) {
    console.log(error);
  }
};
