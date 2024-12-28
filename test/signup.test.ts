import pgPromise from 'pg-promise';
import { signup } from '../src/signup';
import { getAccount } from '../src/getAcount';

describe('signup', () => {
  const POSTGRES_PASS = 123456;
  const POSTGRES_HOST = '127.0.0.1';
  const POSTGRES_PORT = 5432;
  const POSTGRES_DB = 'app';
  const dbConn = pgPromise()(`postgres://postgres:${POSTGRES_PASS}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}`);

  beforeAll(async () => {
    await dbConn.query('TRUNCATE ccca.account;');
  });

  afterAll(async () => {
    await dbConn.$pool.end();
  });

  it('Should create Passenger Account', async () => {
    const account = { name: 'Marco Prosta', email: 'marco@gmail.com', cpf: '97456321558', isPassenger: true, isDriver: false, password: '123456' };
    const resultSignup = (await signup(dbConn, account)) as { accountId: string };
    const resultGetAccount = await getAccount(dbConn, resultSignup?.accountId);
    expect(resultGetAccount?.name).toBe('Marco Prosta');
  });

  it('Should create Driver Account', async () => {
    const account = { name: 'Paulo Arruda', email: 'paulo@gmail.com', cpf: '71428793860', carPlate: 'AAA0000', isPassenger: false, isDriver: true, password: '123456' };
    const resultSignup = (await signup(dbConn, account)) as { accountId: string };
    const resultGetAccount = await getAccount(dbConn, resultSignup?.accountId);
    expect(resultGetAccount?.name).toBe('Paulo Arruda');
  });

  it('Must fail to create Account [Existent Account]', async () => {
    const account = { name: 'Marco Prosta', email: 'marco@gmail.com', cpf: '97456321558', isPassenger: true, isDriver: false, password: '123456' };
    const resultSignup = await signup(dbConn, account);
    expect(resultSignup).toBe(-4);
  });

  it('Must fail to create Account [Invalid name]', async () => {
    const account = { name: 'Jessica', email: 'jessica@gmail.com', cpf: '87748248800', isPassenger: true, isDriver: false, password: '123456' };
    const resultSignup = await signup(dbConn, account);
    expect(resultSignup).toBe(-3);
  });

  it('Must fail to create Account [Invalid email]', async () => {
    const account = { name: 'Jessica Maciel', email: 'jessica', cpf: '87748248800', isPassenger: true, isDriver: false, password: '123456' };
    const resultSignup = await signup(dbConn, account);
    expect(resultSignup).toBe(-2);
  });

  it('Must fail to create Account [Invalid cpf]', async () => {
    const account = { name: 'Jessica Maciel', email: 'jessica@gmail.com', cpf: '11111111111', isPassenger: true, isDriver: false, password: '123456' };
    const resultSignup = await signup(dbConn, account);
    expect(resultSignup).toBe(-1);
  });

  it('Must fail to create Driver Account [Invalid Car Plate]', async () => {
    const account = { name: 'Jessica Maciel', email: 'jessica@gmail.com', cpf: '87748248800', carPlate: 'AAA00', isPassenger: false, isDriver: true, password: '123456' };
    const resultSignup = await signup(dbConn, account);
    expect(resultSignup).toBe(-5);
  });
});
