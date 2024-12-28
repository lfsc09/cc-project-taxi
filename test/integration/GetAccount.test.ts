import AccountDAOMemory from '../../src/AccountDAOMemory';
import GetAccount from '../../src/GetAccount';
import Signup, { SignupOutput } from '../../src/Signup';

describe('UseCase: GetAccount', () => {
    let accountDAO: AccountDAOMemory;
    let getAccount: GetAccount;

    beforeEach(() => {
        accountDAO = new AccountDAOMemory();
        getAccount = new GetAccount(accountDAO);
    });

    it('Should return Account', async () => {
        const inputAccount = { name: 'Marco Prosta', email: 'marco@gmail.com', cpf: '97456321558', isPassenger: true, isDriver: false, password: '123456' };
        const outputSignup = (await new Signup(accountDAO).execute(inputAccount)) as SignupOutput;
        const accountId = outputSignup?.accountId;
        expect(accountId).toBeDefined();

        const resultGetAccount = await getAccount.execute(accountId);
        expect(resultGetAccount?.name).toBe('Marco Prosta');
    });

    it('Should return Null for unexistent ID', async () => {
        await expect(() => getAccount.execute(crypto.randomUUID())).rejects.toThrow(new Error('Not Found.'));
    });
});
