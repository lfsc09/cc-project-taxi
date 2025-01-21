import Registry from '../../src/infra/DI';
import AccountDAOMemory from '../../src/infra/dao/Account/AccountDAOMemory';
import GetAccount from '../../src/usecases/GetAccount';

describe('UseCase: GetAccount', () => {
    let getAccount: GetAccount;
    let accountDAO: AccountDAOMemory;

    beforeEach(() => {
        Registry.getInstance().provide('accountDAO', new AccountDAOMemory());
        getAccount = new GetAccount();
        accountDAO = Registry.getInstance().inject('accountDAO');
    });

    it('Should return Account', async () => {
        const input = {
            accountId: crypto.randomUUID(),
            name: 'Marco Prosta',
            email: 'marco@gmail.com',
            cpf: '97456321558',
            isPassenger: true,
            isDriver: false,
            password: '123456',
        };
        accountDAO.accounts.push({
            account_id: input.accountId,
            name: input.name,
            email: input.email,
            cpf: input.cpf,
            car_plate: '',
            is_passanger: input.isPassenger,
            is_driver: input.isDriver,
            password: input.password,
        });
        const output = await getAccount.execute(input.accountId);
        expect(output?.account_id).toBe(input.accountId);
        expect(output?.name).toBe(input.name);
        expect(output?.email).toBe(input.email);
        expect(output?.cpf).toBe(input.cpf);
        expect(output?.is_driver).toBeFalsy();
        expect(output?.is_passanger).toBeTruthy();
    });

    it('Should return Null for unexistent ID', async () => {
        await expect(() => getAccount.execute(crypto.randomUUID())).rejects.toThrow(new Error('Not Found.'));
    });
});
