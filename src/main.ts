import pgPromise from 'pg-promise';
import express from 'express';
import { getAccount } from './getAcount';
import { signup } from './signup';
import pg from 'pg-promise/typescript/pg-subset';

const POSTGRES_PASS = 123456;
const POSTGRES_HOST = '127.0.0.1';
const POSTGRES_PORT = 5432;
const POSTGRES_DB = 'app';

export type DbConn = pgPromise.IDatabase<{}, pg.IClient>;
let dbConn: DbConn | undefined;

const main = (): void => {
  dbConn = pgPromise()(`postgres://postgres:${POSTGRES_PASS}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}`) ?? undefined;
  if (!dbConn) throw new Error('Unable to connect to PostgreSQL.');

  const app = express();
  app.use(express.json());

  app.post('/signup', async function (req: any, res: any) {
    const input = req.body;
    const result = await signup(dbConn!, input);
    if (typeof result === 'number') {
      res.status(422).json({ message: result });
    } else {
      res.json(result);
    }
  });

  app.get('/getAccount', async function (req: any, res: any) {
    const accountId = req.query?.id ?? '';
    const result = await getAccount(dbConn!, accountId);
    if (!result) {
      res.status(404).json({ message: 'Not Found' });
    } else {
      res.json(result);
    }
  });

  app.listen(3000);
}

try {
  main();
} catch(error) {
  console.error(error);
  dbConn?.$pool.end();
}
