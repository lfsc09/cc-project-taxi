import Account from '../../../core/entity/Account';
import PgPromiseAdapter from '../../database/PostgresqlAdapter';
import { inject } from '../../DI';
import AccountRepository from './AccountRepository';

export default class AccountRepositoryDatabase implements AccountRepository {
    @inject('postgreSQL')
    dbConn?: PgPromiseAdapter;

    async isDuplicateByEmail(email: string): Promise<boolean> {
        const [account] = await this.dbConn?.query(
            `
                SELECT *
                FROM
                    account
                WHERE
                    email = $1
                ;
            `,
            [email],
        );
        return !!account;
    }

    async isAccountPassenger(accountId: string): Promise<boolean> {
        const [account] = await this.dbConn?.query(
            `
                SELECT *
                FROM
                    account
                WHERE
                    account_id = $1 AND
                    is_passenger = true
                ;
            `,
            [accountId],
        );
        return !!account;
    }

    async isAccountDriver(accountId: string): Promise<boolean> {
        const [account] = await this.dbConn?.query(
            `
                SELECT *
                FROM
                    account
                WHERE
                    account_id = $1 AND
                    is_driver = true
                ;
            `,
            [accountId],
        );
        return !!account;
    }

    async createAccount(account: Account): Promise<void> {
        await this.dbConn?.query(
            `
                INSERT INTO
                    account (account_id, name, email, cpf, car_plate, is_passenger, is_driver, password)
                VALUES
                    ($1, $2, $3, $4, $5, $6, $7, $8)
                ;
            `,
            [
                account.getAccountID(),
                account.getName(),
                account.getEmail(),
                account.getCpf(),
                account.getCarPlate() ?? '',
                account.getIsPassenger(),
                account.getIsDriver(),
                account.getPassword(),
            ],
        );
    }
}
