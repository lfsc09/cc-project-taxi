import AccountDAO, { GetAccountByIdOutput } from './AccountDAO';

export default class GetAccount {
    constructor(private readonly accountDAO: AccountDAO) {}

    async execute(accountId: string): Promise<GetAccountOutput> {
        const account = await this.accountDAO.getAccountById(accountId);
        if (!account) throw new Error('Not Found.');
        return account;
    }
}

export interface GetAccountOutput extends GetAccountByIdOutput {}
