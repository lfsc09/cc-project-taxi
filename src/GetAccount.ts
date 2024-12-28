import AccountDAO, { GetAccountByIdOutput } from './AccountDAO';

export default class GetAccount {
    constructor(private readonly accountDAO: AccountDAO) {}

    async execute(id: string): Promise<GetAccountByIdOutput> {
        const account = await this.accountDAO.getAccountById(id);
        if (!account) throw new Error('Not Found.');
        return account;
    }
}
