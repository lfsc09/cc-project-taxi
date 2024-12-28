import express from 'express';
import pgPromise from 'pg-promise';
import pg from 'pg-promise/typescript/pg-subset';
import AccountDAODatabase from './AccountDAODatabase';
import GetAccount from './GetAccount';
import GetRide from './GetRide';
import RequestRide from './RequestRide';
import RideDAODatabase from './RideDAODatabase';
import Signup from './Signup';

const POSTGRES_PASS = 123456;
const POSTGRES_HOST = '127.0.0.1';
const POSTGRES_PORT = 5432;
const POSTGRES_DB = 'app';

export type DbConn = pgPromise.IDatabase<{}, pg.IClient>;
let dbConn: DbConn | undefined;

const main = (): void => {
    dbConn = pgPromise()(`postgres://postgres:${POSTGRES_PASS}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}`) ?? undefined;
    if (!dbConn) throw new Error('Unable to connect to PostgreSQL.');
    const accountDAO = new AccountDAODatabase(dbConn);
    const rideDAO = new RideDAODatabase(dbConn);
    const app = express();

    app.use(express.json());

    app.get('/getAccount', async function (req: express.Request, res: express.Response) {
        const accountId = (req.query?.id ?? '') as string;
        try {
            const output = await new GetAccount(accountDAO).execute(accountId);
            res.json(output);
        } catch (error: any) {
            res.status(404).json({ message: error.message });
        }
    });

    app.get('/getRide', async function (req: express.Request, res: express.Response) {
        const rideId = (req.query?.id ?? '') as string;
        try {
            const output = await new GetRide(rideDAO).execute(rideId);
            res.json(output);
        } catch (error: any) {
            res.status(404).json({ message: error.message });
        }
    });

    app.post('/signup', async function (req: express.Request, res: express.Response) {
        const input = req.body;
        try {
            const output = await new Signup(accountDAO).execute(input);
            res.json(output);
        } catch (error: any) {
            res.status(422).json({ message: error.message });
        }
    });

    app.get('/requestRide', async function (req: express.Request, res: express.Response) {
        const input = req.body;
        try {
            const output = await new RequestRide(rideDAO, accountDAO).execute(input);
            res.json(output);
        } catch (error: any) {
            res.status(422).json({ message: error.message });
        }
    });

    app.listen(3000);
};

try {
    main();
} catch (error: any) {
    console.error(error);
    dbConn?.$pool.end();
}
