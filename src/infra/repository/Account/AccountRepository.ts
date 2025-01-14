import Account from "../../../core/entity/Account";

export default interface AccountRepository {
    isDuplicateByEmail(email: string): Promise<boolean>;
    isAccountPassenger(accountId: string): Promise<boolean>;
    createAccount(account: Account): Promise<void>;
}