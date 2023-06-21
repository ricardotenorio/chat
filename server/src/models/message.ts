import {DataTypes, Model} from 'sequelize';
import sequelizeConnection from '../db/config';
import User from './user';

class Message extends Model {
  public id!: number;
  public userId!: number;
  public chatId!: number;
  public body!: string;

  public static associate() {
    Message.belongsTo(User, {foreignKey: 'user_id', as: 'user'});
  }
}

Message.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    chat_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    body: {
      type: DataTypes.STRING(512),
      allowNull: true,
    },
  },
  {
    sequelize: sequelizeConnection,
    modelName: 'Message',
    tableName: 'messages',
    timestamps: false,
    underscored: true,
  }
);
export default Message;
