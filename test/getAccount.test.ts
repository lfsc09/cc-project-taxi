import pgPromise from 'pg-promise';
import { signup } from '../src/signup';
import { getAccount } from '../src/getAcount';

describe('getAccount', () => {
  const POSTGRES_PASS = 123456;
  const POSTGRES_HOST = '127.0.0.1';
  const POSTGRES_PORT = 5432;
  const POSTGRES_DB = 'app';
  const dbConn = pgPromise()(`postgres://postgres:${POSTGRES_PASS}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}`);
  let accountId: string;

  beforeAll(async () => {
    await dbConn.query('TRUNCATE ccca.account;');
    const account = { name: 'Marco Prosta', email: 'marco@gmail.com', cpf: '97456321558', isPassenger: true, isDriver: false, password: '123456' };
    const resultSignup = (await signup(dbConn, account)) as { accountId: string };
    accountId = resultSignup?.accountId;
  });

  afterAll(async () => {
    await dbConn.$pool.end();
  });

  it('Should return Account', async () => {
    const resultGetAccount = await getAccount(dbConn, accountId);
    expect(resultGetAccount?.name).toBe('Marco Prosta');
  });

  it('Should return Null for unexistent ID', async () => {
    const resultGetAccount = await getAccount(dbConn, crypto.randomUUID());
    expect(resultGetAccount).toBeUndefined();
  });
});
