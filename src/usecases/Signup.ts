import { inject } from '../infra/DI';
import Account from '../core/entity/Account';
import AccountRepository from '../infra/repository/Account/AccountRepository';

export default class Signup {
    @inject('accountRepository')
    accountRepository?: AccountRepository;

    async execute(input: any): Promise<SignupOutput> {
        const newAccount = Account.create(input.name, input.email, input.cpf, input.isPassenger, input.isDriver, input.password, input?.carPlate);

        const accountExists = await this.accountRepository?.isDuplicateByEmail(newAccount.getEmail());
        if (accountExists) throw new Error('Duplicated account.');

        await this.accountRepository?.createAccount(newAccount);

        return { accountId: newAccount.getAccountID() };
    }
}

export interface SignupInput {
    name: string;
    email: string;
    cpf: string;
    carPlate?: string;
    isPassenger: boolean;
    isDriver: boolean;
    password: string;
}
export interface SignupOutput {
    accountId: string;
}
