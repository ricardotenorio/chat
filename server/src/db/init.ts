import {QueryTypes} from 'sequelize';
import sequelizeConnection from './config';
import {userScript} from './create-user';

export const init = () => {
  try {
    sequelizeConnection.query(userScript, {type: QueryTypes.RAW});
  } catch (error) {
    console.log(error);
  }
};
