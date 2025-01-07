import Signup, { SignupOutput } from '../../src//usecases/Signup';
import AccountDAOMemory from '../../src/infra/dao/Account/AccountDAOMemory';
import Registry from '../../src/infra/DI';

describe('Usecase: Signup', () => {
    let signup: Signup;

    beforeEach(() => {
        Registry.getInstance().provide('accountDAO', new AccountDAOMemory());
        signup = new Signup();
    });

    it('Should create Passenger Account', async () => {
        const input = { name: 'Marco Prosta', email: 'marco@gmail.com', cpf: '97456321558', isPassenger: true, isDriver: false, password: '123456' };
        const outputSignup = (await signup.execute(input)) as SignupOutput;
        expect(outputSignup?.accountId).toBeDefined();
    });

    it('Should create Driver Account', async () => {
        const input = { name: 'Paulo Arruda', email: 'paulo@gmail.com', cpf: '71428793860', carPlate: 'AAA0000', isPassenger: false, isDriver: true, password: '123456' };
        const outputSignup = (await signup.execute(input)) as SignupOutput;
        expect(outputSignup?.accountId).toBeDefined();
    });

    it('Must fail to create Account [Existent Account]', async () => {
        const input = { name: 'Marco Prosta', email: 'marco@gmail.com', cpf: '97456321558', isPassenger: true, isDriver: false, password: '123456' };
        const outputSignup = (await signup.execute(input)) as SignupOutput;
        expect(outputSignup?.accountId).toBeDefined();
        await expect(() => signup.execute(input)).rejects.toThrow(new Error('Duplicated account.'));
    });

    it('Must fail to create Account [Invalid name]', async () => {
        const input = { name: 'Jessica', email: 'jessica@gmail.com', cpf: '87748248800', isPassenger: true, isDriver: false, password: '123456' };
        await expect(() => signup.execute(input)).rejects.toThrow(new Error('Invalid name.'));
    });

    it('Must fail to create Account [Invalid email]', async () => {
        const input = { name: 'Jessica Maciel', email: 'jessica', cpf: '87748248800', isPassenger: true, isDriver: false, password: '123456' };
        await expect(() => signup.execute(input)).rejects.toThrow(new Error('Invalid email.'));
    });

    it('Must fail to create Account [Invalid cpf]', async () => {
        const input = { name: 'Jessica Maciel', email: 'jessica@gmail.com', cpf: '11111111111', isPassenger: true, isDriver: false, password: '123456' };
        await expect(() => signup.execute(input)).rejects.toThrow(new Error('Invalid cpf.'));
    });

    it('Must fail to create Driver Account [Invalid Car Plate]', async () => {
        const input = { name: 'Jessica Maciel', email: 'jessica@gmail.com', cpf: '87748248800', carPlate: 'AAA00', isPassenger: false, isDriver: true, password: '123456' };
        await expect(() => signup.execute(input)).rejects.toThrow(new Error('Invalid car plate.'));
    });
});
