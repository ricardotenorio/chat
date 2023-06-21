export const messagesScript = `CREATE TABLE IF NOT EXISTS Messages (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  chat_id INTEGER NOT NULL,
  body TEXT,

  FOREIGN KEY (user_id) REFERENCES users (id),
  FOREIGN KEY (chat_id) REFERENCES chats (id)
)`;

export const chatsScript = `CREATE TABLE IF NOT EXISTS Chats (
  id SERIAL PRIMARY KEY,
  name VARCHAR(64) NOT NULL
)`;

export const usersChatsScript = `CREATE TABLE IF NOT EXISTS user_chat (
  chat_id INTEGER,
  user_id INTEGER,

  PRIMARY KEY (chat_id, user_id),
  FOREIGN KEY (chat_id) REFERENCES chats (id),
  FOREIGN KEY (user_id) REFERENCES users (id),
)`;
