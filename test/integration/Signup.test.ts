import Signup, { SignupOutput } from '../../src//usecases/Signup';
import Registry from '../../src/infra/DI';
import AccountRepositoryMemory from '../../src/infra/repository/Account/AccountRepositoryMemory';

describe('Usecase: Signup', () => {
    let signup: Signup;

    beforeEach(() => {
        Registry.getInstance().provide('accountRepository', new AccountRepositoryMemory());
        signup = new Signup();
    });

    it('Should create an Account', async () => {
        const input = { name: 'Marco Prosta', email: 'marco@gmail.com', cpf: '97456321558', isPassenger: true, isDriver: false, password: '123456' };
        const output = (await signup.execute(input)) as SignupOutput;
        expect(output?.accountId).toBeDefined();
    });

    it('Should fail to create an Account [Existent Account]', async () => {
        const input = { name: 'Marco Prosta', email: 'marco@gmail.com', cpf: '97456321558', isPassenger: true, isDriver: false, password: '123456' };
        const output = (await signup.execute(input)) as SignupOutput;
        expect(output?.accountId).toBeDefined();
        await expect(() => signup.execute(input)).rejects.toThrow(new Error('Duplicated account.'));
    });
});
