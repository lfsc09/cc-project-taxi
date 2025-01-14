import PgPromiseAdapter from '../../database/PostgreSQL';
import { inject } from '../../DI';
import AccountDAO, { GetAccountByIdOutput } from './AccountDAO';

export default class AccountDAODatabase implements AccountDAO {
    @inject('postgreSQL')
    dbConn?: PgPromiseAdapter;

    async getAccountById(accountId: string): Promise<GetAccountByIdOutput> {
        const [account] = await this.dbConn?.query('SELECT * FROM ccca.account WHERE account_id = $1', [accountId]);
        return account;
    }
}
