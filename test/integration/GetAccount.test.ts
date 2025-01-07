import Registry from '../../src/infra/DI';
import AccountDAOMemory from '../../src/infra/dao/Account/AccountDAOMemory';
import GetAccount from '../../src/usecases/GetAccount';
import Signup, { SignupOutput } from '../../src/usecases/Signup';

describe('UseCase: GetAccount', () => {
    let getAccount: GetAccount;

    beforeEach(() => {
        Registry.getInstance().provide('accountDAO', new AccountDAOMemory());
        getAccount = new GetAccount();
    });

    it('Should return Account', async () => {
        const inputAccount = { name: 'Marco Prosta', email: 'marco@gmail.com', cpf: '97456321558', isPassenger: true, isDriver: false, password: '123456' };
        const outputSignup = (await new Signup().execute(inputAccount)) as SignupOutput;
        const accountId = outputSignup?.accountId;
        expect(accountId).toBeDefined();

        const resultGetAccount = await getAccount.execute(accountId);
        expect(resultGetAccount?.name).toBe('Marco Prosta');
    });

    it('Should return Null for unexistent ID', async () => {
        await expect(() => getAccount.execute(crypto.randomUUID())).rejects.toThrow(new Error('Not Found.'));
    });
});
