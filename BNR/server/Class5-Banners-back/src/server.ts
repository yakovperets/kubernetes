import express, { json } from "express";
import "dotenv/config";
import chalk from "chalk";
import { transporter } from "./utils/send-email";
import router from "./router/router";
import errors from "./errors/errors";
import connectToPostgreSQL from "./utils/connect-to-postgreSQL";
import connectToMongoDB from "./utils/connect-to-mongoDB";
import morganLogger from "./logger/morgan-logger";
import customCors from "./cors/custom-cors";
import initialPostgreSQL from "./utils/initial-postgreSQL";
import initialMongo from "./utils/initial-mongo";
import axios from "axios";

const app = express();

app.use(morganLogger);
app.use(customCors);
app.use(json());
app.use(router);

const start = async () => {
  const port = process.env.PORT;
  if (!port) throw new Error(errors.portMissing);
  app.listen(port, () => {
    console.log(chalk.green(`server is running on port ${port}`));
  });

  console.log(chalk.blue("testing products server..."));
  if (!process.env.ALL_PRODUCT_URL) throw new Error(errors.productsURLmissing);
  await axios.get(process.env.ALL_PRODUCT_URL);
  console.log(chalk.green("products server is up"));

  console.log(chalk.blue("connecting to mongoBD..."));
  if (!process.env.MONGODB_URI) throw new Error(errors.mongoDBURImissing);
  await connectToMongoDB(process.env.MONGODB_URI);
  console.log(chalk.green("connected to mongoDB"));

  console.log(chalk.blue("connecting to postgreSQL..."));
  if (!process.env.POSTGRESQL_CONNECTION_STRING)
    throw new Error(errors.postgreSQLconStrMissing);
  await connectToPostgreSQL();
  console.log(chalk.green("connected to postgreSQL"));

  console.log(chalk.blue("initializing databases..."));
  await initialPostgreSQL();
  await initialMongo();
  console.log(chalk.green("databases initialized successfully"));

  console.log(chalk.blue("verifying gmail client..."));
  if (!process.env.GMAIL_USERNAME) throw new Error(errors.gmailUNmissing);
  if (!process.env.GMAIL_APP_PASSWORD) throw new Error(errors.gmailPWmissing);
  await transporter.verify();
  console.log(chalk.green("gmail verification succeed"));

  if (!process.env.JWT_SECRET) throw new Error(errors.JWTkeyMissing);
};

start();
