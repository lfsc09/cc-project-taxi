import { AccountDAOMemory } from './AccountDAO';
import GetAccount from './GetAccount';
import Signup from './Signup';

describe('getAccount', () => {
  const accountDAO = new AccountDAOMemory();
  const getAccount = new GetAccount(accountDAO);

  it('Should return Account', async () => {
    const createdAccount = { name: 'Marco Prosta', email: 'marco@gmail.com', cpf: '97456321558', isPassenger: true, isDriver: false, password: '123456' };
    const resultSignup = (await new Signup(accountDAO).execute(createdAccount)) as { accountId: string };
    const accountId = resultSignup?.accountId;
    expect(accountId).toBeDefined();

    const resultGetAccount = await getAccount.execute(accountId);
    expect(resultGetAccount?.name).toBe('Marco Prosta');
  });

  it('Should return Null for unexistent ID', async () => {
    await expect(() => getAccount.execute(crypto.randomUUID())).rejects.toThrow(new Error('Not Found.'));
  });
});
