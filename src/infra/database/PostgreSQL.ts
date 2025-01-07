import pgPromise from 'pg-promise';
import DatabaseConnection from './DatabaseConnection';
import pg from 'pg-promise/typescript/pg-subset';

export default class PgPromiseAdapter implements DatabaseConnection {
    #connection: pgPromise.IDatabase<{}, pg.IClient>;

    constructor(host: string, port: number, password: string, db: string) {
        try {
            this.#connection = pgPromise()(`postgres://postgres:${password}@${host}:${port}/${db}`);
        } catch (error) {
            throw new Error('Unable to connect to PostgreSQL.');
        }
    }

    query(queryString: string, params: any): Promise<any> {
        return this.#connection?.query(queryString, params);
    }

    async end(): Promise<void> {
        await this.#connection?.$pool.end();
    }
}
