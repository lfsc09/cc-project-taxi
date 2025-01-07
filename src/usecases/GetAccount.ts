import AccountDAO, { GetAccountByIdOutput } from '../infra/dao/Account/AccountDAO';
import { inject } from '../infra/DI';

export default class GetAccount {
    @inject('accountDAO')
    accountDAO?: AccountDAO;

    async execute(accountId: string): Promise<GetAccountOutput> {
        const account = await this.accountDAO?.getAccountById(accountId);
        if (!account) throw new Error('Not Found.');
        return account;
    }
}

export interface GetAccountOutput extends GetAccountByIdOutput {}
