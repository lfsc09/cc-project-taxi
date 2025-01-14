import Account from '../../../core/entity/Account';
import AccountRepository from './AccountRepository';

export default class AccountRepositoryMemory implements AccountRepository {
    accounts: Account[] = [];

    async isDuplicateByEmail(email: string): Promise<boolean> {
        return !!this.accounts.find((account: Account) => account.getEmail() === email);
    }

    async isAccountPassenger(accountId: string): Promise<boolean> {
        return !!this.accounts.find((account: Account) => account.getAccountID() === accountId && account.getIsPassenger());
    }

    async createAccount(account: Account): Promise<void> {
        this.accounts.push(account);
    }
}
