import { AccountDAOMemory } from './AccountDAO';
import GetAccount from './GetAccount';
import Signup from './Signup';

describe('signup', () => {
  const accountDAO = new AccountDAOMemory();
  const signup = new Signup(accountDAO);
  const getAccount = new GetAccount(accountDAO);

  it('Should create Passenger Account', async () => {
    const account = { name: 'Marco Prosta', email: 'marco@gmail.com', cpf: '97456321558', isPassenger: true, isDriver: false, password: '123456' };
    const resultSignup = (await signup.execute(account)) as { accountId: string };
    const resultGetAccount = await getAccount.execute(resultSignup?.accountId);
    expect(resultGetAccount?.name).toBe('Marco Prosta');
  });

  it('Should create Driver Account', async () => {
    const account = { name: 'Paulo Arruda', email: 'paulo@gmail.com', cpf: '71428793860', carPlate: 'AAA0000', isPassenger: false, isDriver: true, password: '123456' };
    const resultSignup = (await signup.execute(account)) as { accountId: string };
    const resultGetAccount = await getAccount.execute(resultSignup?.accountId);
    expect(resultGetAccount?.name).toBe('Paulo Arruda');
  });

  it('Must fail to create Account [Existent Account]', async () => {
    const account = { name: 'Marco Prosta', email: 'marco@gmail.com', cpf: '97456321558', isPassenger: true, isDriver: false, password: '123456' };
    await expect(() => signup.execute(account)).rejects.toThrow(new Error('Duplicated account.'));
  });

  it('Must fail to create Account [Invalid name]', async () => {
    const account = { name: 'Jessica', email: 'jessica@gmail.com', cpf: '87748248800', isPassenger: true, isDriver: false, password: '123456' };
    await expect(() => signup.execute(account)).rejects.toThrow(new Error('Invalid name.'));
  });

  it('Must fail to create Account [Invalid email]', async () => {
    const account = { name: 'Jessica Maciel', email: 'jessica', cpf: '87748248800', isPassenger: true, isDriver: false, password: '123456' };
    await expect(() => signup.execute(account)).rejects.toThrow(new Error('Invalid email.'));
  });

  it('Must fail to create Account [Invalid cpf]', async () => {
    const account = { name: 'Jessica Maciel', email: 'jessica@gmail.com', cpf: '11111111111', isPassenger: true, isDriver: false, password: '123456' };
    await expect(() => signup.execute(account)).rejects.toThrow(new Error('Invalid cpf.'));
  });

  it('Must fail to create Driver Account [Invalid Car Plate]', async () => {
    const account = { name: 'Jessica Maciel', email: 'jessica@gmail.com', cpf: '87748248800', carPlate: 'AAA00', isPassenger: false, isDriver: true, password: '123456' };
    await expect(() => signup.execute(account)).rejects.toThrow(new Error('Invalid car plate.'));
  });
});
