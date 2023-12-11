import { client } from "./connect-to-postgreSQL";

export default async () => {
  try {
    await client.query(`
    CREATE TABLE IF NOT EXISTS users (
      user_id serial PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      "isAdmin" boolean NOT NULL,
      created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
   );`);
  } catch (error) {
    return Promise.reject(error);
  }
};

// export default async () => {
//     await client.query(`
//     CREATE TABLE users (
//     // columns
//     );
//     `);

//     // initialize data
//     await client.query(`
//     INSERT INTO users // data
//     `);
//     } else {
//         console.log("Users table already exists");
//     }
