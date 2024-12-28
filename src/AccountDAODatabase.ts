import AccountDAO, { CreateAccountInput, GetAccountByIdOutput } from './AccountDAO';
import { DbConn } from './main';

export default class AccountDAODatabase implements AccountDAO {
    constructor(private readonly conn: DbConn) {}

    async getAccountById(accountId: string): Promise<GetAccountByIdOutput> {
        const [account] = await this.conn.query('SELECT * FROM ccca.account WHERE account_id = $1', [accountId]);
        return account;
    }

    async isDuplicateByEmail(email: string): Promise<boolean> {
        const [account] = await this.conn.query('SELECT * FROM ccca.account WHERE email = $1', [email]);
        return !!account;
    }

    async isAccountPassenger(accountId: string): Promise<boolean> {
        const [account] = await this.conn.query('SELECT * FROM ccca.account WHERE account_id = $1 AND is_passenger = True', [accountId]);
        return !!account;
    }

    async createAccount(account: CreateAccountInput): Promise<void> {
        await this.conn.query('INSERT INTO ccca.account (account_id, name, email, cpf, car_plate, is_passenger, is_driver, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [
            account.accountId,
            account.name,
            account.email,
            account.cpf,
            account?.carPlate ?? '',
            !!account.isPassenger,
            !!account.isDriver,
            account.password,
        ]);
    }
}
