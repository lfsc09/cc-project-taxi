import AccountDAO, { GetAccountByIdOutput } from './AccountDAO';

export default class AccountDAOMemory implements AccountDAO {
    accounts: Account[] = [];

    async getAccountById(accountId: string): Promise<GetAccountByIdOutput> {
        return this.accounts.find((account: Account) => account.account_id === accountId) as GetAccountByIdOutput;
    }
}

type Account = {
    account_id: string;
    name: string;
    email: string;
    cpf: string;
    car_plate: string;
    is_passanger: boolean;
    is_driver: boolean;
    password: string;
};
