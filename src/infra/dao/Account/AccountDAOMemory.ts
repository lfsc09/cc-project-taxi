import AccountDAO, { CreateAccountInput, GetAccountByIdOutput } from './AccountDAO';

export default class AccountDAOMemory implements AccountDAO {
    private accounts: Account[] = [];

    async getAccountById(accountId: string): Promise<GetAccountByIdOutput> {
        return this.accounts.find((account: Account) => account.account_id === accountId) as GetAccountByIdOutput;
    }

    async isDuplicateByEmail(email: string): Promise<boolean> {
        return !!this.accounts.find((account: Account) => account.email === email);
    }

    async isAccountPassenger(accountId: string): Promise<boolean> {
        return !!this.accounts.find((account: Account) => account.account_id === accountId && account.is_passanger);
    }

    async createAccount(account: CreateAccountInput): Promise<void> {
        this.accounts.push({
            account_id: account.accountId,
            name: account.name,
            email: account.email,
            cpf: account.cpf,
            car_plate: account?.carPlate ?? '',
            is_passanger: !!account.isPassenger,
            is_driver: !!account.isDriver,
            password: account.password,
        });
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
}
